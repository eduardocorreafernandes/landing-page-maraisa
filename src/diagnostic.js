import './diagnostic.css';
import { profiles } from './data/diagnostic-questions.js';
import {
  createDiagnosticState, getQuestions, setProfile, answerQuestion, navigateBack,
  editQuestion, getProgress, getAnswerSummary, hasAllAnswers, getSummaryText, getContactUrl,
} from './diagnostic-model.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 12 4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** onContact builds and returns a WhatsApp URL (or null); it must not send/store data. */
export function initDiagnostic(element, { onContact } = {}) {
  if (!element) throw new Error('O diagnóstico precisa de um elemento de destino.');
  let state = createDiagnosticState();
  let transitionTimer;
  let focusFrame;
  let renderedProgress = 0;
  let contactUrl = null;
  let feedback = '';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  element.classList.add('diagnostic-app');

  const button = (option, selected) => `
    <button class="diagnostic-option${selected ? ' diagnostic-option-selected' : ''}" type="button"
      data-answer="${escapeHtml(option.value)}" aria-pressed="${selected}">
      <span class="diagnostic-option-text"><span>${escapeHtml(option.label)}</span>
      ${option.description ? `<span class="diagnostic-option-description">${escapeHtml(option.description)}</span>` : ''}</span>
      <span class="diagnostic-option-mark">${selected ? check : arrow}</span>
    </button>`;

  function renderReview() {
    const profile = profiles.find((entry) => entry.value === state.profile);
    return `
      <h3 class="diagnostic-title" tabindex="-1">Seu momento, em poucas palavras.</h3>
      <p class="diagnostic-description">Confira suas respostas. Você pode ajustar qualquer uma antes de conversar.</p>
      <dl class="diagnostic-summary">
        <div class="diagnostic-summary-row"><div><dt>Seu foco</dt><dd>${escapeHtml(profile.label)}</dd></div>
          <button type="button" class="diagnostic-edit" data-edit="profile" aria-label="Alterar seu foco">Alterar</button></div>
        ${getAnswerSummary(state).map(({ id, question, answer }) => `
          <div class="diagnostic-summary-row"><div><dt>${escapeHtml(question)}</dt><dd>${escapeHtml(answer)}</dd></div>
          <button type="button" class="diagnostic-edit" data-edit="${id}" aria-label="Alterar: ${escapeHtml(question)}">Alterar</button></div>`).join('')}
      </dl>
      <form class="diagnostic-form">
        <label class="diagnostic-name-label" for="diagnostic-name">Como podemos chamar você?</label>
        <input class="diagnostic-name" id="diagnostic-name" name="name" autocomplete="given-name" maxlength="70"
          value="${escapeHtml(state.name)}" placeholder="Seu nome" required aria-describedby="diagnostic-privacy">
        <p class="diagnostic-privacy" id="diagnostic-privacy">Suas respostas ficam apenas nesta página. Elas só serão enviadas quando você abrir a conversa e confirmar o envio no WhatsApp.</p>
        <button class="diagnostic-primary" type="submit">Preparar minha conversa ${arrow}</button>
      </form>`;
  }

  function renderComplete() {
    const firstName = state.name.trim().split(/\s+/)[0];
    return `
      <div class="diagnostic-complete-symbol">${check}</div>
      <h3 class="diagnostic-title" tabindex="-1">Obrigada por compartilhar seu momento, ${escapeHtml(firstName)}.</h3>
      <p class="diagnostic-description">Suas respostas estão prontas para começar uma conversa com mais contexto e atenção ao que importa para você.</p>
      ${contactUrl ? `
        <a class="diagnostic-primary" href="${escapeHtml(contactUrl)}" target="_blank" rel="noopener noreferrer">Conversar com a Maraísa ${arrow}</a>
        <p class="diagnostic-privacy">O WhatsApp abrirá com seu resumo. Confira a mensagem e toque em enviar quando estiver pronto.</p>` : `
        <p class="diagnostic-unavailable">O contato por WhatsApp ainda não está disponível nesta página. Você pode copiar seu resumo para guardar e compartilhar depois.</p>`}
      <div class="diagnostic-complete-actions">
        <button class="diagnostic-secondary" type="button" data-copy>Copiar meu resumo</button>
        <button class="diagnostic-text-button" type="button" data-review>Revisar respostas</button>
      </div>
      <p class="diagnostic-feedback" role="status" aria-live="polite">${escapeHtml(feedback)}</p>
      <div class="diagnostic-copy-fallback" hidden>
        <label for="diagnostic-copy-text">Selecione e copie seu resumo:</label>
        <textarea id="diagnostic-copy-text" readonly rows="10">${escapeHtml(getSummaryText(state))}</textarea>
      </div>`;
  }

  function render(focus = true, ensureVisible = true) {
    clearTimeout(transitionTimer);
    cancelAnimationFrame(focusFrame);
    transitionTimer = null;
    const progress = getProgress(state);
    const isProfile = state.currentId === 'profile';
    const isEnd = ['review', 'complete'].includes(state.currentId);
    const question = getQuestions(state).find((entry) => entry.id === state.currentId);
    const profileName = profiles.find((entry) => entry.value === state.profile)?.label;
    element.innerHTML = `
      <div class="diagnostic-meta">
        <span class="diagnostic-counter">${isEnd ? 'Seu resumo' : `${String(progress.current).padStart(2, '0')} <span>/ ${String(progress.total).padStart(2, '0')}</span>`}</span>
        <span class="diagnostic-profile-label">${escapeHtml(profileName || 'Uma conversa começa aqui')}</span>
      </div>
      <div class="diagnostic-progress" role="progressbar" aria-label="Progresso do diagnóstico"
        aria-valuemin="0" aria-valuemax="${progress.total}" aria-valuenow="${progress.current}"
        aria-valuetext="${isEnd ? 'Perguntas concluídas' : `Etapa ${progress.current} de ${progress.total}`}">
        <span class="diagnostic-progress-track"><span class="diagnostic-progress-fill"
          style="--diagnostic-progress: ${progress.percent / 100}; --diagnostic-progress-from: ${renderedProgress}"></span></span>
        <img class="diagnostic-progress-symbol" src="/assets/brand/symbol.svg" alt="" width="30" height="28" aria-hidden="true">
      </div>
      <div class="diagnostic-content">
        ${state.currentId === 'review' ? renderReview() : state.currentId === 'complete' ? renderComplete() : `
          <h3 class="diagnostic-title" tabindex="-1">${isProfile ? 'Por onde vamos começar?' : escapeHtml(question.title)}</h3>
          <p class="diagnostic-description">${isProfile ? 'Escolha a área que precisa de mais clareza hoje.' : escapeHtml(question.description)}</p>
          <div class="diagnostic-options" role="group" aria-label="Escolha uma resposta">
            ${(isProfile ? profiles : question.options).map((option) => button(option, (isProfile ? state.profile : state.answers[question.id]) === option.value)).join('')}
          </div>
          <p class="diagnostic-help">Selecione uma opção para continuar. Você pode voltar e ajustar suas respostas.</p>`}
      </div>
      ${!isProfile && state.currentId !== 'complete' ? `<div class="diagnostic-navigation"><button class="diagnostic-back" type="button" data-back>${arrow} ${state.editing && hasAllAnswers(state) ? 'Voltar à revisão' : 'Voltar'}</button></div>` : ''}
      <span class="diagnostic-screen-reader" aria-live="polite" aria-atomic="true">${isEnd ? 'Perguntas concluídas. Confira seu resumo.' : `Etapa ${progress.current} de ${progress.total}.`}</span>`;

    renderedProgress = progress.percent / 100;
    if (focus) {
      const heading = element.querySelector('.diagnostic-title');
      heading.focus({ preventScroll: true });
      if (ensureVisible) {
        // Wait for layout/scroll anchoring after a long review collapses.
        // External profile selection deliberately leaves scrolling to the page.
        focusFrame = requestAnimationFrame(() => {
          if (!heading.isConnected) return;
          const bounds = heading.getBoundingClientRect();
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          if (bounds.top < 24 || bounds.bottom > viewportHeight - 24) {
            heading.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
          }
        });
      }
    }
  }

  element.addEventListener('click', async (event) => {
    const target = event.target.closest('button');
    if (!target || !element.contains(target)) return;
    if (target.hasAttribute('data-answer')) {
      if (transitionTimer) return;
      const value = target.dataset.answer;
      const next = state.currentId === 'profile' ? setProfile(state, value) : answerQuestion(state, state.currentId, value);
      element.querySelectorAll('.diagnostic-option').forEach((option) => {
        const selected = option === target;
        option.classList.toggle('diagnostic-option-selected', selected);
        option.setAttribute('aria-pressed', String(selected));
        // Keep focus on the selected answer until the next heading is ready.
        option.setAttribute('aria-disabled', 'true');
        option.querySelector('.diagnostic-option-mark').innerHTML = selected ? check : arrow;
      });
      transitionTimer = setTimeout(() => {
        transitionTimer = null;
        state = next;
        render();
      }, reducedMotion.matches ? 0 : 180);
    } else if (target.hasAttribute('data-back')) {
      state = navigateBack(state);
      render();
    } else if (target.hasAttribute('data-edit')) {
      state = editQuestion(state, target.dataset.edit);
      render();
    } else if (target.hasAttribute('data-review')) {
      state = { ...state, currentId: 'review', editing: false };
      render();
    } else if (target.hasAttribute('data-copy')) {
      const summary = getSummaryText(state);
      target.setAttribute('aria-busy', 'true');
      try {
        await navigator.clipboard.writeText(summary);
        if (state.currentId !== 'complete' || getSummaryText(state) !== summary) return;
        feedback = 'Resumo copiado. Você pode colar onde preferir.';
        element.querySelector('.diagnostic-feedback').textContent = feedback;
      } catch {
        if (state.currentId !== 'complete' || getSummaryText(state) !== summary) return;
        element.querySelector('.diagnostic-copy-fallback').hidden = false;
        feedback = 'Não foi possível copiar automaticamente. Seu resumo está abaixo para copiar.';
        element.querySelector('.diagnostic-feedback').textContent = feedback;
        const text = element.querySelector('#diagnostic-copy-text');
        text.focus();
        text.select();
      } finally {
        if (target.isConnected) target.removeAttribute('aria-busy');
      }
    }
  });

  element.addEventListener('input', (event) => {
    if (event.target.name === 'name') {
      state = { ...state, name: event.target.value };
      event.target.setCustomValidity('');
    }
  });

  element.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = element.querySelector('#diagnostic-name');
    if (!state.name.trim()) {
      input.setCustomValidity('Escreva seu nome para preparar a conversa.');
      input.reportValidity();
      return;
    }
    if (!hasAllAnswers(state)) return;
    contactUrl = getContactUrl(state, onContact);
    state = { ...state, name: state.name.trim(), currentId: 'complete', editing: false };
    feedback = '';
    render();
  });

  render(false, false);
  return {
    selectProfile(profile) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
      state = setProfile(state, profile);
      contactUrl = null;
      render(true, false);
    },
  };
}

import { initDiagnostic } from './diagnostic.js';
import { initMotion } from './motion.js';
import { site, testimonials, credentials } from './data/site.js';
import { createWhatsAppUrl, contactFromDiagnostic } from './contact.js';

const diagnostic = initDiagnostic(document.querySelector('#diagnostic-app'), { onContact: contactFromDiagnostic });
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.dataset.open = 'false';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});

document.querySelectorAll('[data-profile]').forEach(button => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    const profile = button.dataset.profile;
    document.querySelectorAll('[data-profile]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    document.querySelector('#profile-status').textContent = profile === 'business' ? 'Vamos olhar para o seu negócio. As perguntas estão prontas para você.' : 'Vamos olhar para as suas finanças. As perguntas estão prontas para você.';
    diagnostic.selectProfile(profile);
    document.querySelector('#diagnostico').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
});

const contactUrl = createWhatsAppUrl(site.contactMessage);
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  if (contactUrl) link.href = contactUrl;
  else {
    link.href = '#contato';
    link.removeAttribute('target');
    link.addEventListener('click', () => { document.querySelector('#contact-unavailable').hidden = false; });
  }
});
if (site.instagram) {
  const link = document.querySelector('#instagram-link');
  link.href = site.instagram;
  link.hidden = false;
}
document.querySelector('#current-year').textContent = new Date().getFullYear();

// Componentes aguardam provas reais, sem publicar placeholders como se fossem depoimentos.
if (credentials.length) {
  const region = document.querySelector('#credentials');
  region.classList.add('credentials-list');
  region.hidden = false;
  credentials.forEach(credential => {
    const paragraph = document.createElement('p');
    paragraph.textContent = credential;
    region.append(paragraph);
  });
}
if (testimonials.length) {
  const section = document.querySelector('#testimonials');
  const stage = section.querySelector('.testimonial-stage');
  const counter = section.querySelector('.testimonial-counter');
  let current = 0;
  function showTestimonial() {
    const item = testimonials[current];
    const quote = document.createElement('blockquote');
    const author = document.createElement('p');
    quote.textContent = `“${item.quote}”`;
    author.textContent = [item.name, item.context].filter(Boolean).join(' · ');
    stage.replaceChildren(quote, author);
    counter.textContent = `${current + 1} / ${testimonials.length}`;
  }
  section.hidden = false;
  section.querySelector('[data-testimonial-prev]').addEventListener('click', () => { current = (current - 1 + testimonials.length) % testimonials.length; showTestimonial(); });
  section.querySelector('[data-testimonial-next]').addEventListener('click', () => { current = (current + 1) % testimonials.length; showTestimonial(); });
  if (testimonials.length < 2) section.querySelector('.testimonial-controls').hidden = true;
  showTestimonial();
}
initMotion();

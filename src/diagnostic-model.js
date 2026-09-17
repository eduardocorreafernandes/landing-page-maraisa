import { diagnosticQuestions, profiles } from './data/diagnostic-questions.js';
import { diagnosticMessage } from './contact.js';

export const createDiagnosticState = () => ({
  profile: null, answers: {}, currentId: 'profile', name: '', editing: false,
});

export function getQuestions(state) {
  return (diagnosticQuestions[state.profile] || []).filter((question) =>
    !question.when || state.answers[question.when.question] === question.when.value,
  );
}

export function setProfile(state, profile) {
  if (!profiles.some((entry) => entry.value === profile)) return state;
  const next = {
    ...state, profile, answers: state.profile === profile ? { ...state.answers } : {}, editing: false,
  };
  return { ...next, currentId: getQuestions(next)[0].id };
}

export function hasAllAnswers(state) {
  return Boolean(state.profile) && getQuestions(state).every((question) =>
    question.options.some((option) => option.value === state.answers[question.id]),
  );
}

export function answerQuestion(state, questionId, value) {
  const question = getQuestions(state).find((entry) => entry.id === questionId);
  if (!question?.options.some((option) => option.value === value)) return state;
  let next = { ...state, answers: { ...state.answers, [questionId]: value } };
  const visible = getQuestions(next);
  next.answers = Object.fromEntries(visible
    .filter((entry) => entry.options.some((option) => option.value === next.answers[entry.id]))
    .map((entry) => [entry.id, next.answers[entry.id]]));
  const currentIndex = visible.findIndex((entry) => entry.id === questionId);
  const following = state.editing
    ? visible.find((entry) => !next.answers[entry.id])
    : visible[currentIndex + 1];
  next.currentId = following?.id || 'review';
  return next;
}

export function navigateBack(state) {
  const questions = getQuestions(state);
  if (state.currentId === 'complete') return { ...state, currentId: 'review', editing: false };
  if (state.editing && hasAllAnswers(state)) return { ...state, currentId: 'review', editing: false };
  const index = state.currentId === 'review'
    ? questions.length
    : questions.findIndex((question) => question.id === state.currentId);
  return { ...state, currentId: questions[index - 1]?.id || 'profile', editing: false };
}

export function editQuestion(state, questionId) {
  if (questionId === 'profile') return { ...state, currentId: 'profile', editing: true };
  return getQuestions(state).some((question) => question.id === questionId)
    ? { ...state, currentId: questionId, editing: true }
    : state;
}

export function getProgress(state) {
  const questions = getQuestions(state);
  const total = state.profile ? questions.length + 1 : 7;
  const current = state.currentId === 'profile' ? 1
    : ['review', 'complete'].includes(state.currentId) ? total
      : questions.findIndex((question) => question.id === state.currentId) + 2;
  return { current, total, percent: Math.round((current / total) * 100) };
}

export function getAnswerSummary(state) {
  return getQuestions(state).filter((question) => state.answers[question.id]).map((question) => ({
    id: question.id, question: question.title,
    answer: question.options.find((option) => option.value === state.answers[question.id])?.label || '',
  }));
}

export function buildContactPayload(state) {
  if (!hasAllAnswers(state) || !state.name.trim()) return null;
  return {
    name: state.name.trim(), profile: state.profile,
    answers: { ...state.answers },
  };
}

export function getSummaryText(state) {
  const payload = buildContactPayload(state);
  return payload ? diagnosticMessage(payload) : '';
}

export function getContactUrl(state, onContact) {
  const payload = buildContactPayload(state);
  if (!payload || typeof onContact !== 'function') return null;
  try {
    const url = new URL(onContact(payload));
    return url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)
      ? url.href : null;
  } catch {
    return null;
  }
}

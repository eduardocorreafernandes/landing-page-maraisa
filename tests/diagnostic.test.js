import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDiagnosticState, getQuestions, setProfile, answerQuestion, navigateBack,
  editQuestion, getProgress, hasAllAnswers, buildContactPayload, getContactUrl,
} from '../src/diagnostic-model.js';

function finish(profile, debt = 'no') {
  let state = setProfile(createDiagnosticState(), profile);
  while (state.currentId !== 'review') {
    const question = getQuestions(state).find((entry) => entry.id === state.currentId);
    state = answerQuestion(state, question.id, question.id === 'debt' ? debt : question.options[0].value);
  }
  return { ...state, name: 'Ana' };
}

test('personal route skips debt details when there is no debt', () => {
  const state = finish('personal');
  assert.equal(hasAllAnswers(state), true);
  assert.equal(getQuestions(state).some(({ id }) => id === 'debt_context'), false);
  assert.deepEqual(getProgress(state), { current: 7, total: 7, percent: 100 });
});

test('debt follow-up appears conditionally and stale answers are removed after editing', () => {
  let state = finish('personal', 'yes');
  assert.ok(state.answers.debt_context);
  assert.equal(getProgress(state).total, 8);
  state = answerQuestion(editQuestion(state, 'debt'), 'debt', 'no');
  assert.equal(state.currentId, 'review');
  assert.equal(state.answers.debt_context, undefined);
  assert.equal(getProgress(state).total, 7);
  assert.equal(Object.keys(buildContactPayload(state).answers).length, 6);
});

test('editing to add a debt requests missing follow-up before returning to review', () => {
  let state = finish('personal');
  state = answerQuestion(editQuestion(state, 'debt'), 'debt', 'yes');
  assert.equal(state.currentId, 'debt_context');
  assert.equal(hasAllAnswers(state), false);
  state = answerQuestion(state, 'debt_context', 'pressure');
  assert.equal(state.currentId, 'review');
  assert.equal(hasAllAnswers(state), true);
});

test('switching profiles clears dependent answers but keeps the name', () => {
  const state = setProfile(finish('personal'), 'business');
  assert.deepEqual(state.answers, {});
  assert.equal(state.name, 'Ana');
  assert.equal(state.currentId, 'revenue');
  assert.equal(hasAllAnswers(state), false);
  assert.equal(getQuestions(state).length, 5);
});

test('going back preserves selections and edits return to the review', () => {
  const original = finish('business');
  let state = navigateBack(original);
  assert.equal(state.currentId, 'business_goal');
  assert.deepEqual(state.answers, original.answers);
  state = answerQuestion(editQuestion(original, 'revenue'), 'revenue', 'talk');
  assert.equal(state.currentId, 'review');
  assert.equal(state.answers.revenue, 'talk');
  assert.equal(navigateBack(editQuestion(state, 'revenue')).currentId, 'review');
});

test('invalid answers and profiles are ignored', () => {
  const state = setProfile(createDiagnosticState(), 'personal');
  assert.equal(answerQuestion(state, 'income', 'fake'), state);
  assert.equal(answerQuestion(state, 'debt_context', 'pressure'), state);
  assert.equal(setProfile(state, 'unknown'), state);
});

test('contact payload contains name, profile, and semantic answer values', () => {
  let captured;
  const state = finish('business');
  const url = getContactUrl(state, (payload) => {
    captured = payload;
    return 'https://wa.me/5511999999999?text=Mensagem';
  });
  assert.equal(url, 'https://wa.me/5511999999999?text=Mensagem');
  assert.deepEqual(Object.keys(captured), ['name', 'profile', 'answers']);
  assert.equal(captured.name, 'Ana');
  assert.equal(captured.profile, 'business');
  assert.equal(Object.keys(captured.answers).length, 5);
  assert.equal(captured.answers.revenue, 'routine');
});

test('missing contact, unsafe URL, incomplete answers, and missing name do not produce a link', () => {
  const state = finish('personal');
  assert.equal(getContactUrl(state, () => null), null);
  assert.equal(getContactUrl(state, () => 'javascript:alert(1)'), null);
  assert.equal(getContactUrl(state, () => 'https://example.com'), null);
  assert.equal(getContactUrl(state, () => { throw new Error('Unavailable'); }), null);
  assert.equal(buildContactPayload({ ...state, name: '  ' }), null);
  assert.equal(buildContactPayload(createDiagnosticState()), null);
});

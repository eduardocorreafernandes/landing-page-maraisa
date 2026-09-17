import test from 'node:test';
import assert from 'node:assert/strict';
import { createWhatsAppUrl, diagnosticMessage } from '../src/contact.js';

test('sem contato verificado, não cria destino fictício', () => {
  assert.equal(createWhatsAppUrl('Olá', null), null);
  assert.equal(createWhatsAppUrl('Olá', '+55 contato'), null);
});
test('codifica mensagem e preserva acentos e quebras de linha', () => {
  const text = diagnosticMessage({ name: 'Teste & QA', profile: 'business', answers: [{ question: 'Caixa?', answer: 'Prefiro conversar.' }] });
  const url = new URL(createWhatsAppUrl(text, '5511000000000'));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.searchParams.get('text'), text);
  assert.match(text, /minha empresa/);
});

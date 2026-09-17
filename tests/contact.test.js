import test from 'node:test';
import assert from 'node:assert/strict';
import { createWhatsAppUrl, diagnosticMessage } from '../src/contact.js';

test('sem contato verificado, não cria destino fictício', () => {
  assert.equal(createWhatsAppUrl('Olá', null), null);
  assert.equal(createWhatsAppUrl('Olá', '+55 contato'), null);
});
test('codifica mensagem e preserva acentos e quebras de linha', () => {
  const text = diagnosticMessage({
    name: 'Teste & QA', profile: 'business',
    answers: { revenue: 'partial', costs: 'mixed', cashflow: 'reactive', profit: 'unclear', business_goal: 'organize' },
  });
  const url = new URL(createWhatsAppUrl(text, '5511000000000'));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.searchParams.get('text'), text);
  assert.match(text, /minha empresa/);
});

test('transforma respostas pessoais em um resumo corrido e humano', () => {
  const text = diagnosticMessage({
    name: 'Eduardo', profile: 'personal',
    answers: {
      income: 'variable', expenses: 'partial', debt: 'yes', debt_context: 'organized',
      card: 'surprises', goal: 'organize', planning: 'restart',
    },
  });
  assert.equal(text, [
    'Olá, Maraísa! Meu nome é Eduardo e gostaria de conversar sobre minha vida financeira.',
    'Hoje minha renda varia de um mês para o outro. Embora eu tenha uma noção de para onde o dinheiro vai, ainda não consigo visualizar tudo com clareza. Tenho algumas dívidas que estão em dia, mas gostaria de me organizar melhor. Às vezes também sou surpreendido pelo valor da fatura do cartão.',
    'Meu principal objetivo neste momento é organizar melhor o dia a dia financeiro e ter mais clareza sobre minhas decisões.',
    'Já tentei me planejar algumas vezes, mas tenho dificuldade em manter essa organização ao longo do tempo.',
    'Gostaria de conversar sobre como posso melhorar esse cenário e quais seriam os próximos passos.',
  ].join('\n\n'));
  assert.doesNotMatch(text, /Como a sua renda|Qual é o lugar do cartão/);
});

test('condensa respostas empresariais sem exportar perguntas', () => {
  const text = diagnosticMessage({
    name: 'Ana', profile: 'business',
    answers: { revenue: 'unclear', costs: 'partial', cashflow: 'short', profit: 'estimate', business_goal: 'growth' },
  });
  assert.match(text, /Ainda não tenho uma visão organizada do faturamento/);
  assert.match(text, /planejar os próximos passos do negócio com mais segurança/);
  assert.doesNotMatch(text, /Como você acompanha|Os custos do negócio/);
});

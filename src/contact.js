import { site } from './data/site.js';

export function createWhatsAppUrl(message, number = site.whatsapp) {
  if (!number || !/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function diagnosticMessage({ name, profile, answers }) {
  const area = profile === 'business' ? 'minha empresa' : 'minha vida financeira';
  return [
    `Olá, Maraísa! Meu nome é ${name}. Gostaria de conversar sobre ${area}.`,
    '', 'Compartilho meu momento:',
    ...answers.map(({ question, answer }) => `${question}\n${answer}`),
    '', 'Podemos conversar sobre os próximos passos?',
  ].join('\n');
}

// Ponto de integração futuro: o diagnóstico só conhece este adaptador.
// Não existe persistência nem transmissão automática de respostas.
export function contactFromDiagnostic(payload) {
  return createWhatsAppUrl(diagnosticMessage(payload));
}

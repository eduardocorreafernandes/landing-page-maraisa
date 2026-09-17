import { site } from './data/site.js';

export function createWhatsAppUrl(message, number = site.whatsapp) {
  if (!number || !/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const personalCopy = {
  income: {
    fixed: 'Hoje tenho uma renda regular.',
    variable: 'Hoje minha renda varia de um mês para o outro.',
    mixed: 'Hoje tenho uma combinação de renda fixa e variável.',
  },
  expenses: {
    clear: 'Consigo acompanhar com clareza para onde o dinheiro vai.',
    partial: 'Embora eu tenha uma noção de para onde o dinheiro vai, ainda não consigo visualizar tudo com clareza.',
    unclear: 'Ainda não consigo identificar com clareza para onde o dinheiro vai ao longo do mês.',
  },
  card: {
    planned: 'Costumo usar o cartão dentro do que planejei.',
    surprises: 'Às vezes também sou surpreendido pelo valor da fatura do cartão.',
    none: 'Não uso cartão de crédito.',
  },
  goal: {
    organize: 'Meu principal objetivo neste momento é organizar melhor o dia a dia financeiro e ter mais clareza sobre minhas decisões.',
    debt: 'Meu principal objetivo neste momento é encontrar um caminho para sair das dívidas com mais segurança.',
    future: 'Meu principal objetivo neste momento é criar uma reserva e planejar meus próximos passos.',
    talk: 'Prefiro explicar meu principal objetivo durante a conversa.',
  },
  planning: {
    routine: 'Hoje tenho uma rotina de planejamento que consigo manter.',
    restart: 'Já tentei me planejar algumas vezes, mas tenho dificuldade em manter essa organização ao longo do tempo.',
    start: 'Ainda não sei por onde começar a organizar meu dinheiro.',
    talk: 'Prefiro contar durante a conversa como tenho tentado me organizar.',
  },
};

const businessCopy = {
  revenue: {
    routine: 'Acompanho o faturamento da empresa com registros frequentes.',
    partial: 'Registro o faturamento, mas ainda não consigo acompanhá-lo com a frequência que gostaria.',
    unclear: 'Ainda não tenho uma visão organizada do faturamento da empresa.',
  },
  costs: {
    clear: 'Tenho clareza sobre os custos do negócio e acompanho suas mudanças.',
    partial: 'Conheço os principais custos do negócio, mas ainda faltam detalhes para enxergar o cenário completo.',
    mixed: 'Ainda misturo alguns custos pessoais com os da empresa.',
  },
  cashflow: {
    planned: 'Consigo me preparar com antecedência para as entradas e saídas do caixa.',
    short: 'Minha visão do caixa ainda fica concentrada no mês atual.',
    reactive: 'Hoje resolvo os compromissos financeiros conforme eles aparecem.',
  },
  profit: {
    clear: 'Também consigo acompanhar o lucro e o resultado do negócio.',
    estimate: 'Tenho uma estimativa do lucro, mas ainda falta clareza sobre o resultado real.',
    unclear: 'A empresa vende, mas ainda não consigo enxergar com clareza o que realmente sobra.',
  },
  business_goal: {
    organize: 'Meu principal objetivo neste momento é organizar melhor as finanças da empresa.',
    profit: 'Meu principal objetivo neste momento é compreender melhor os custos e os resultados da empresa.',
    growth: 'Meu principal objetivo neste momento é planejar os próximos passos do negócio com mais segurança.',
    talk: 'Prefiro explicar durante a conversa qual decisão da empresa precisa de mais clareza.',
  },
};

function debtSummary(answers) {
  if (answers.debt === 'no') return 'Não tenho dívidas neste momento.';
  if (answers.debt === 'talk') return 'Prefiro conversar com mais cuidado sobre a minha situação com dívidas.';
  if (answers.debt !== 'yes') return '';
  return {
    organized: 'Tenho algumas dívidas que estão em dia, mas gostaria de me organizar melhor.',
    pressure: 'Tenho dívidas cujas parcelas pesam no meu orçamento e quero encontrar uma forma melhor de lidar com elas.',
    overdue: 'Tenho alguns pagamentos em atraso e quero entender como posso organizar essa situação.',
    talk: 'Tenho algumas dívidas e prefiro explicar melhor essa situação durante a conversa.',
  }[answers.debt_context] || 'Tenho algumas dívidas que gostaria de organizar melhor.';
}

function paragraph(parts) {
  return parts.filter(Boolean).join(' ');
}

function personalBlocks(answers) {
  const situation = paragraph([
    personalCopy.income[answers.income],
    personalCopy.expenses[answers.expenses],
    debtSummary(answers),
    personalCopy.card[answers.card],
  ]);
  return [situation, personalCopy.goal[answers.goal], personalCopy.planning[answers.planning]].filter(Boolean);
}

function businessBlocks(answers) {
  const situation = paragraph([
    businessCopy.revenue[answers.revenue],
    businessCopy.costs[answers.costs],
    businessCopy.cashflow[answers.cashflow],
    businessCopy.profit[answers.profit],
  ]);
  return [situation, businessCopy.business_goal[answers.business_goal]].filter(Boolean);
}

export function diagnosticMessage({ name, profile, answers = {} }) {
  const isBusiness = profile === 'business';
  const area = isBusiness ? 'minha empresa' : 'minha vida financeira';
  const blocks = isBusiness ? businessBlocks(answers) : personalBlocks(answers);
  return [
    `Olá, Maraísa! Meu nome é ${name} e gostaria de conversar sobre ${area}.`,
    ...blocks,
    'Gostaria de conversar sobre como posso melhorar esse cenário e quais seriam os próximos passos.',
  ].join('\n\n');
}

// Ponto de integração futuro: o diagnóstico só conhece este adaptador.
// Não existe persistência nem transmissão automática de respostas.
export function contactFromDiagnostic(payload) {
  return createWhatsAppUrl(diagnosticMessage(payload));
}

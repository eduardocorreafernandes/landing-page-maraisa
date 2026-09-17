/**
 * CONTEÚDO TEMPORÁRIO: o Google Forms original não foi fornecido.
 * Substituir estas perguntas pelas perguntas aprovadas por Maraísa antes de publicar.
 * Este roteiro apenas organiza a conversa; não calcula score nem análise financeira.
 */
export const diagnosticContentStatus = 'temporary-awaiting-original-form';

export const profiles = [
  { value: 'personal', label: 'Minha vida financeira', description: 'Meu dinheiro, minhas escolhas e meus planos.' },
  { value: 'business', label: 'Minha empresa', description: 'As finanças e os próximos passos do meu negócio.' },
];

const preferToTalk = { value: 'talk', label: 'Prefiro conversar sobre isso' };

export const diagnosticQuestions = {
  personal: [
    {
      id: 'income', title: 'Como a sua renda chega até você?',
      description: 'Não precisamos de valores. Só de um pouco de contexto.',
      options: [
        { value: 'fixed', label: 'Tenho uma renda regular' },
        { value: 'variable', label: 'Minha renda varia a cada mês' },
        { value: 'mixed', label: 'Tenho renda fixa e variável' },
        preferToTalk,
      ],
    },
    {
      id: 'expenses', title: 'Você sabe para onde seu dinheiro vai?',
      description: 'Pense em como você acompanha seus gastos hoje.',
      options: [
        { value: 'clear', label: 'Sim, acompanho com clareza' },
        { value: 'partial', label: 'Tenho uma ideia, mas não vejo tudo' },
        { value: 'unclear', label: 'Chego ao fim do mês sem saber' },
        preferToTalk,
      ],
    },
    {
      id: 'debt', title: 'Há alguma dívida que precisa da sua atenção?',
      description: 'Aqui, o ponto de partida é entender. Sem julgamentos.',
      options: [
        { value: 'yes', label: 'Sim, quero olhar para isso' },
        { value: 'no', label: 'Não tenho dívidas neste momento' },
        preferToTalk,
      ],
    },
    {
      id: 'debt_context', title: 'Como essas dívidas aparecem na sua rotina?',
      description: 'Escolha a situação que mais se aproxima do seu momento.',
      when: { question: 'debt', value: 'yes' },
      options: [
        { value: 'organized', label: 'Estão em dia, mas quero me organizar melhor' },
        { value: 'pressure', label: 'As parcelas pesam no meu orçamento' },
        { value: 'overdue', label: 'Tenho pagamentos em atraso' },
        preferToTalk,
      ],
    },
    {
      id: 'card', title: 'Qual é o lugar do cartão na sua vida?',
      description: 'Pense no que costuma acontecer com a sua fatura.',
      options: [
        { value: 'planned', label: 'Uso dentro do que planejei' },
        { value: 'surprises', label: 'Às vezes, a fatura me surpreende' },
        { value: 'none', label: 'Não uso cartão de crédito' },
        preferToTalk,
      ],
    },
    {
      id: 'goal', title: 'O que você mais quer mudar hoje?',
      description: 'Escolha o que é prioridade para você agora.',
      options: [
        { value: 'organize', label: 'Organizar o dia a dia e ter clareza' },
        { value: 'debt', label: 'Encontrar um caminho para sair das dívidas' },
        { value: 'future', label: 'Criar uma reserva e planejar meus próximos passos' },
        preferToTalk,
      ],
    },
    {
      id: 'planning', title: 'Como você costuma planejar seu dinheiro?',
      description: 'Não existe resposta certa. Existe o seu momento.',
      options: [
        { value: 'routine', label: 'Tenho uma rotina que consigo manter' },
        { value: 'restart', label: 'Começo a me organizar, mas não sustento' },
        { value: 'start', label: 'Ainda não sei por onde começar' },
        preferToTalk,
      ],
    },
  ],
  business: [
    {
      id: 'revenue', title: 'Como você acompanha o faturamento da empresa?',
      description: 'Não precisamos de números exatos para começar.',
      options: [
        { value: 'routine', label: 'Tenho registros e acompanho com frequência' },
        { value: 'partial', label: 'Registro, mas nem sempre acompanho' },
        { value: 'unclear', label: 'Ainda não tenho essa visão organizada' },
        preferToTalk,
      ],
    },
    {
      id: 'costs', title: 'Os custos do negócio estão claros para você?',
      description: 'Pense nas despesas que mantêm a empresa funcionando.',
      options: [
        { value: 'clear', label: 'Sei quais são e acompanho as mudanças' },
        { value: 'partial', label: 'Conheço os principais, mas falta detalhe' },
        { value: 'mixed', label: 'Ainda misturo custos pessoais e da empresa' },
        preferToTalk,
      ],
    },
    {
      id: 'cashflow', title: 'Como está a previsibilidade do seu caixa?',
      description: 'Olhe para as entradas e saídas dos próximos meses.',
      options: [
        { value: 'planned', label: 'Consigo me preparar com antecedência' },
        { value: 'short', label: 'Tenho uma visão apenas do mês atual' },
        { value: 'reactive', label: 'Resolvo os compromissos conforme aparecem' },
        preferToTalk,
      ],
    },
    {
      id: 'profit', title: 'Você consegue enxergar o lucro da empresa?',
      description: 'Faturamento e lucro contam partes diferentes da história.',
      options: [
        { value: 'clear', label: 'Sim, acompanho o resultado do negócio' },
        { value: 'estimate', label: 'Tenho uma estimativa, mas falta clareza' },
        { value: 'unclear', label: 'A empresa vende, mas não sei o que sobra' },
        preferToTalk,
      ],
    },
    {
      id: 'business_goal', title: 'Qual decisão precisa de mais clareza agora?',
      description: 'Escolha o que faria mais diferença para o seu negócio.',
      options: [
        { value: 'organize', label: 'Organizar as finanças da empresa' },
        { value: 'profit', label: 'Entender custos e resultados' },
        { value: 'growth', label: 'Planejar os próximos passos com mais segurança' },
        preferToTalk,
      ],
    },
  ],
};

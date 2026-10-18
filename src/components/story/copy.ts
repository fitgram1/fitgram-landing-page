/** Texto da história — pt-PT. Valores numéricos são exemplos ilustrativos, identificados como tal no ecrã. */
export const copy = {
  hero: {
    eyebrow: 'O teu progresso começa aqui',
    headline: 'Treina melhor. Evolui sempre.',
    sub: 'Uma plataforma para criares treinos, acompanhares a nutrição e transformares progresso em resultados.',
    primary: 'Começar agora',
    secondary: 'Explorar o FitGram',
  },
  movement: {
    title: 'Cada movimento conta.',
    sub: 'Do primeiro gesto ao registo: o treino ganha forma.',
  },
  coach: {
    title: 'Do treinador para o atleta. Sem complicações.',
    sub: 'O mesmo plano, do computador do treinador ao telemóvel do atleta.',
  },
  live: {
    title: 'Menos distrações. Mais treino.',
    sub: 'Regista cada série e vê as cargas anteriores.',
  },
  nutrition: {
    title: 'A evolução também se constrói à mesa.',
    sub: 'Plano alimentar, refeições, receitas e macros no mesmo sítio.',
  },
  progress: {
    title: 'Não acompanhes apenas treinos. Acompanha evolução.',
    sub: 'Histórico, cargas e recordes num só gráfico.',
  },
  demoTag: 'Exemplo ilustrativo',
  demoData: 'Dados de demonstração',
  exercise: {
    name: 'Supino com halteres',
    muscles: 'Peito · Tríceps',
    stats: [
      { label: 'Séries', value: '3' },
      { label: 'Repetições', value: '12' },
      { label: 'Carga', value: '24 kg' },
      { label: 'Descanso', value: '90 s' },
      { label: 'RPE', value: '8' },
    ],
  },
  macros: { kcal: 620, p: 42, c: 68, f: 18 },
  load: [20, 20, 22, 22, 24, 24, 26, 28],
} as const;

export type Locale = 'en' | 'pt' | 'es';

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

export interface Messages {
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
}

export const messages: Record<Locale, Messages> = {
  en: {
    faq: {
      eyebrow: 'FAQ',
      heading: 'Quick questions, quick answers',
      items: [
        {
          q: 'Where can I use FitGram?',
          a: 'At app.fitgram.pt, in the browser on your computer or phone. The same account works everywhere.',
        },
        {
          q: 'Do I need to change how I work?',
          a: 'No. You build workouts and meal plans the way you already do, and your clients get everything in their own account.',
        },
        {
          q: 'Do my clients need an account too?',
          a: 'Yes. You invite each client from the app and they see their workouts, log sessions and send check-ins from their account.',
        },
      ],
    },
  },

  pt: {
    faq: {
      eyebrow: 'FAQ',
      heading: 'Perguntas rápidas, respostas rápidas',
      items: [
        {
          q: 'Onde posso usar o FitGram?',
          a: 'Em app.fitgram.pt, no browser do computador ou do telemóvel. A mesma conta serve em todo o lado.',
        },
        {
          q: 'Preciso de mudar a forma como trabalho?',
          a: 'Não. Crias os treinos e os planos alimentares como já fazes, e os teus atletas recebem tudo na conta deles.',
        },
        {
          q: 'Os meus atletas também precisam de conta?',
          a: 'Sim. Convidas cada atleta pela app e ele vê os treinos, regista as sessões e envia os check-ins na conta dele.',
        },
      ],
    },
  },

  es: {
    faq: {
      eyebrow: 'FAQ',
      heading: 'Preguntas rápidas, respuestas rápidas',
      items: [
        {
          q: '¿Dónde puedo usar FitGram?',
          a: 'En app.fitgram.pt, en el navegador del ordenador o del móvil. La misma cuenta sirve en todas partes.',
        },
        {
          q: '¿Tengo que cambiar mi forma de trabajar?',
          a: 'No. Creas los entrenamientos y los planes de alimentación como ya lo haces, y tus clientes reciben todo en su cuenta.',
        },
        {
          q: '¿Mis clientes también necesitan cuenta?',
          a: 'Sí. Invitas a cada cliente desde la app y ve sus entrenamientos, registra las sesiones y envía los check-ins desde su cuenta.',
        },
      ],
    },
  },
};

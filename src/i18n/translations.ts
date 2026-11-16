export type Locale = 'en' | 'pt' | 'es';

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

export interface Messages {
  pricing: {
    eyebrow: string;
    headPre: string;
    headHl: string;
    sub: string;
    monthly: string;
    yearly: string;
    perMonth: string;
    perYear: string;
    save: string;
    unlimited: string;
    upTo: string;
    free: { name: string; tagline: string; features: string[]; cta: string };
    pro: { tagline: string; features: string[]; cta: string };
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
}

export const messages: Record<Locale, Messages> = {
  en: {
    pricing: {
      eyebrow: 'Pricing',
      headPre: 'Two plans. ',
      headHl: 'No surprises.',
      sub: 'Start free with your first clients and upgrade to Pro when you grow.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      perMonth: '/ month',
      perYear: '/ year',
      save: 'You save {amount} a year',
      unlimited: 'Unlimited clients',
      upTo: 'Up to {count} clients',
      free: {
        name: 'Free',
        tagline: 'To start with your first clients',
        features: ['Client management', 'Existing clients are never removed'],
        cta: 'Start free',
      },
      pro: {
        tagline: 'For trainers who are growing',
        features: ['Everything included', 'Training and diet templates', 'No client limit'],
        cta: 'Go Pro',
      },
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Quick questions, quick answers',
      items: [
        {
          q: 'Where can I use FitGram?',
          a: 'At app.fitgram.pt, in the browser on your computer or phone. The same account works everywhere.',
        },
        {
          q: 'How much does it cost?',
          a: 'You can start on the free plan, no card needed. When you need more, upgrade to Pro; prices are in the app.',
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
    pricing: {
      eyebrow: 'Preços',
      headPre: 'Dois planos. ',
      headHl: 'Sem surpresas.',
      sub: 'Começa grátis com os teus primeiros clientes e passa a Pro quando crescer.',
      monthly: 'Mensal',
      yearly: 'Anual',
      perMonth: '/ mês',
      perYear: '/ ano',
      save: 'Poupas {amount} por ano',
      unlimited: 'Clientes ilimitados',
      upTo: 'Até {count} clientes',
      free: {
        name: 'Grátis',
        tagline: 'Para começar com os primeiros clientes',
        features: ['Gestão de clientes', 'Os clientes que já tens nunca são removidos'],
        cta: 'Começar grátis',
      },
      pro: {
        tagline: 'Para quem está a crescer',
        features: ['Tudo incluído', 'Modelos de treino e de dieta', 'Sem limite de clientes'],
        cta: 'Passar a Pro',
      },
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Perguntas rápidas, respostas rápidas',
      items: [
        {
          q: 'Onde posso usar o FitGram?',
          a: 'Em app.fitgram.pt, no browser do computador ou do telemóvel. A mesma conta serve em todo o lado.',
        },
        {
          q: 'Quanto custa?',
          a: 'Podes começar no plano gratuito, sem cartão. Quando precisares de mais, passas ao plano Pro, com os valores na app.',
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
    pricing: {
      eyebrow: 'Precios',
      headPre: 'Dos planes. ',
      headHl: 'Sin sorpresas.',
      sub: 'Empieza gratis con tus primeros clientes y pasa a Pro cuando crezcas.',
      monthly: 'Mensual',
      yearly: 'Anual',
      perMonth: '/ mes',
      perYear: '/ año',
      save: 'Ahorras {amount} al año',
      unlimited: 'Clientes ilimitados',
      upTo: 'Hasta {count} clientes',
      free: {
        name: 'Gratis',
        tagline: 'Para empezar con tus primeros clientes',
        features: ['Gestión de clientes', 'Los clientes que ya tienes nunca se eliminan'],
        cta: 'Empezar gratis',
      },
      pro: {
        tagline: 'Para quien está creciendo',
        features: ['Todo incluido', 'Plantillas de entrenamiento y de dieta', 'Sin límite de clientes'],
        cta: 'Pasar a Pro',
      },
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Preguntas rápidas, respuestas rápidas',
      items: [
        {
          q: '¿Dónde puedo usar FitGram?',
          a: 'En app.fitgram.pt, en el navegador del ordenador o del móvil. La misma cuenta sirve en todas partes.',
        },
        {
          q: '¿Cuánto cuesta?',
          a: 'Puedes empezar con el plan gratuito, sin tarjeta. Cuando necesites más, pasas al plan Pro; los precios están en la app.',
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

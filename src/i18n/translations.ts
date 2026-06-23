export type Locale = 'en' | 'pt' | 'es';

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

export interface Messages {
  nav: { cta: string };
  hero: {
    eyebrow: string;
    headPre: string;
    headHl: string;
    headPost: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
  };
  mock: {
    greet: string;
    name: string;
    active: string;
    needCheckin: string;
    plansSent: string;
    todayFocus: string;
    due: string;
    onTrack: string;
    newMessage: string;
  };
  strip: { prefix: string; items: string[] };
  problem: {
    eyebrow: string;
    heading: string;
    lead: string;
    pains: { title: string; body: string }[];
    closePre: string;
    closeHl: string;
    closePost: string;
  };
  solution: {
    eyebrow: string;
    heading: string;
    lead: string;
    features: { tag: string; title: string; body: string }[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: { quote: string; name: string; role: string }[];
    counterLabel: string;
    builtBy: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    lead: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    typeLabel: string;
    typePlaceholder: string;
    typeOptions: { value: string; label: string }[];
    typeError: string;
    nameLabel: string;
    nameOptional: string;
    namePlaceholder: string;
    submit: string;
    submitting: string;
    trust: string;
    errorGeneric: string;
    successTitle: string;
    successBody: string;
  };
  footer: { tagline: string; links: string[]; rights: string };
}

export const messages: Record<Locale, Messages> = {
  en: {
    nav: { cta: "Join the beta — it's free" },
    hero: {
      eyebrow: 'For personal trainers',
      headPre: 'Manage all your clients, workouts, and diets in ',
      headHl: 'one app',
      headPost: ' — not 5 different tools.',
      sub: 'FitGram is the all-in-one platform built for personal trainers. Organize clients, deliver plans, and communicate — all in one place.',
      ctaPrimary: "Join the beta — it's free",
      ctaSecondary: 'See how it works ↓',
      trust: "No spam. Unsubscribe anytime. We'll only email you when it's ready.",
    },
    mock: {
      greet: 'Good morning,',
      name: 'Coach Sofia 👋',
      active: 'Active clients',
      needCheckin: 'Need check-in',
      plansSent: 'Plans sent',
      todayFocus: "Today's focus",
      due: 'Check-in due',
      onTrack: 'On track',
      newMessage: 'New message',
    },
    strip: {
      prefix: 'Replaces',
      items: ['spreadsheets', 'PDF plans', 'WhatsApp threads', 'scattered notes'],
    },
    problem: {
      eyebrow: 'The daily grind',
      heading: 'Sound familiar?',
      lead: "If you're juggling clients across half a dozen apps, you already know the pain.",
      pains: [
        {
          title: 'Client info is everywhere',
          body: 'Phone contacts, WhatsApp chats, random notes. You forget who’s due for a check-in.',
        },
        {
          title: 'Hours lost to copy-paste',
          body: 'You rebuild workout plans from old spreadsheets. Every client gets a slightly different format.',
        },
        {
          title: 'Messages get buried',
          body: 'Coaching questions are lost in personal chats — between memes and group messages.',
        },
      ],
      closePre: 'Most PTs hit a ceiling at ',
      closeHl: '15–20 clients',
      closePost: '. Not because they can’t coach more — because the admin becomes unmanageable.',
    },
    solution: {
      eyebrow: 'The solution',
      heading: 'One platform. Everything you need.',
      lead: 'Each feature kills a daily frustration — so you can coach more people without the chaos.',
      features: [
        {
          tag: '01 — Client Management',
          title: 'See every client in one dashboard',
          body: 'Track their goals, progress, and history. Know exactly who needs your attention today — no more scrolling through chats to remember where everyone’s at.',
        },
        {
          tag: '02 — Workout & Diet Delivery',
          title: 'Build a plan once, assign it with a tap',
          body: 'Create plans from templates or from scratch. Your clients receive clean, structured plans in the app — no more messy PDFs or broken spreadsheet links.',
        },
        {
          tag: '03 — Coaching Inbox',
          title: 'Coaching chat, separate from your life',
          body: 'Keep coaching conversations out of your personal WhatsApp. All messages, plan updates, and client questions in one place — with full context attached.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'What trainers say',
      heading: 'Built by trainers, for trainers',
      items: [
        {
          quote: 'I went from 3 apps and a spreadsheet to just FitGram. I finally stopped losing track of who needs what.',
          name: 'Early concept tester',
          role: 'Online coach · 12 clients',
        },
        {
          quote: 'Sending a week of workouts used to take me an evening. Now it’s a couple of taps.',
          name: 'Gym PT',
          role: 'Strength & conditioning',
        },
        {
          quote: 'My clients’ questions don’t get lost between memes anymore. Everything’s in one place.',
          name: 'Independent PT',
          role: 'Fat loss & nutrition',
        },
      ],
      counterLabel: 'trainers on the waiting list',
      builtBy: 'Built by trainers, for trainers.',
    },
    cta: {
      eyebrow: 'Early access',
      heading: 'Be the first to try FitGram',
      lead: 'We’re building the tool we wish existed when we started coaching. Join the waiting list and get early access.',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      emailError: 'Please enter a valid email address.',
      typeLabel: 'What kind of PT are you?',
      typePlaceholder: 'Select one…',
      typeOptions: [
        { value: 'Gym PT', label: 'Gym PT' },
        { value: 'Online PT', label: 'Online PT' },
        { value: 'Fitness Coach', label: 'Fitness Coach' },
        { value: 'Independent PT', label: 'Independent PT' },
      ],
      typeError: 'Please select your type of PT.',
      nameLabel: 'Name',
      nameOptional: '(optional)',
      namePlaceholder: 'Your name',
      submit: 'Join the waiting list',
      submitting: 'Joining…',
      trust: "No spam. Unsubscribe anytime. We'll only email you when it's ready.",
      errorGeneric: 'Something went wrong — please try again or email us directly.',
      successTitle: 'You’re on the list! 🎉',
      successBody: 'Thanks for signing up. We’ll reach out when FitGram is ready for beta testers. In the meantime, share this with a fellow trainer who might be interested.',
    },
    footer: {
      tagline: 'The all-in-one platform for personal trainers.',
      links: ['Problem', 'Features', 'Join the beta'],
      rights: '© 2026 FitGram. Built by trainers, for trainers.',
    },
  },

  pt: {
    nav: { cta: 'Entra na beta — é grátis' },
    hero: {
      eyebrow: 'Para personal trainers',
      headPre: 'Gere todos os teus clientes, treinos e dietas numa ',
      headHl: 'só app',
      headPost: ' — não em 5 ferramentas diferentes.',
      sub: 'O FitGram é a plataforma tudo-em-um criada para personal trainers. Organiza clientes, envia planos e comunica — tudo num só lugar.',
      ctaPrimary: 'Entra na beta — é grátis',
      ctaSecondary: 'Vê como funciona ↓',
      trust: 'Sem spam. Cancela quando quiseres. Só te enviamos email quando estiver pronto.',
    },
    mock: {
      greet: 'Bom dia,',
      name: 'Coach Sofia 👋',
      active: 'Clientes ativos',
      needCheckin: 'Para rever',
      plansSent: 'Planos enviados',
      todayFocus: 'Foco de hoje',
      due: 'Rever',
      onTrack: 'No caminho',
      newMessage: 'Nova mensagem',
    },
    strip: {
      prefix: 'Substitui',
      items: ['folhas de cálculo', 'planos em PDF', 'conversas no WhatsApp', 'notas dispersas'],
    },
    problem: {
      eyebrow: 'O dia a dia',
      heading: 'Soa familiar?',
      lead: 'Se andas a gerir clientes em meia dúzia de apps, já conheces a dor.',
      pains: [
        {
          title: 'A info dos clientes está em todo o lado',
          body: 'Contactos, conversas de WhatsApp, notas soltas. Esqueces-te de quem precisa de revisão.',
        },
        {
          title: 'Horas perdidas a copiar e colar',
          body: 'Refazes planos a partir de folhas antigas. Cada cliente recebe um formato diferente.',
        },
        {
          title: 'As mensagens perdem-se',
          body: 'As perguntas de coaching perdem-se em conversas pessoais — entre memes e grupos.',
        },
      ],
      closePre: 'A maioria dos PTs chega a um limite aos ',
      closeHl: '15–20 clientes',
      closePost: '. Não por não conseguirem treinar mais — mas porque a parte administrativa fica impossível.',
    },
    solution: {
      eyebrow: 'A solução',
      heading: 'Uma plataforma. Tudo o que precisas.',
      lead: 'Cada funcionalidade elimina uma frustração diária — para treinares mais pessoas sem o caos.',
      features: [
        {
          tag: '01 — Gestão de Clientes',
          title: 'Vê todos os clientes num só painel',
          body: 'Acompanha objetivos, progresso e histórico. Sabe exatamente quem precisa de ti hoje — sem andar a percorrer conversas para te lembrares de cada um.',
        },
        {
          tag: '02 — Treinos e Dietas',
          title: 'Cria o plano uma vez, atribui com um toque',
          body: 'Cria planos a partir de modelos ou do zero. Os clientes recebem planos limpos e estruturados na app — sem PDFs confusos nem links de folhas partidos.',
        },
        {
          tag: '03 — Caixa de Coaching',
          title: 'Chat de coaching, separado da tua vida',
          body: 'Mantém as conversas de coaching fora do teu WhatsApp pessoal. Mensagens, atualizações de planos e perguntas num só lugar — com todo o contexto.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'O que dizem os treinadores',
      heading: 'Feito por treinadores, para treinadores',
      items: [
        {
          quote: 'Passei de 3 apps e uma folha de cálculo para só o FitGram. Finalmente deixei de perder o rasto de quem precisa de quê.',
          name: 'Tester do conceito',
          role: 'Coach online · 12 clientes',
        },
        {
          quote: 'Enviar uma semana de treinos costumava levar-me uma noite. Agora são dois toques.',
          name: 'PT de ginásio',
          role: 'Força e condicionamento',
        },
        {
          quote: 'As perguntas dos meus clientes já não se perdem entre memes. Está tudo num só lugar.',
          name: 'PT independente',
          role: 'Perda de peso e nutrição',
        },
      ],
      counterLabel: 'treinadores na lista de espera',
      builtBy: 'Feito por treinadores, para treinadores.',
    },
    cta: {
      eyebrow: 'Acesso antecipado',
      heading: 'Sê dos primeiros a experimentar o FitGram',
      lead: 'Estamos a construir a ferramenta que gostávamos de ter tido quando começámos. Entra na lista de espera e garante acesso antecipado.',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@exemplo.com',
      emailError: 'Introduz um email válido.',
      typeLabel: 'Que tipo de PT és?',
      typePlaceholder: 'Seleciona…',
      typeOptions: [
        { value: 'Gym PT', label: 'PT de ginásio' },
        { value: 'Online PT', label: 'PT online' },
        { value: 'Fitness Coach', label: 'Treinador de fitness' },
        { value: 'Independent PT', label: 'PT independente' },
      ],
      typeError: 'Seleciona o teu tipo de PT.',
      nameLabel: 'Nome',
      nameOptional: '(opcional)',
      namePlaceholder: 'O teu nome',
      submit: 'Entrar na lista de espera',
      submitting: 'A entrar…',
      trust: 'Sem spam. Cancela quando quiseres. Só te enviamos email quando estiver pronto.',
      errorGeneric: 'Algo correu mal — tenta novamente ou envia-nos email.',
      successTitle: 'Estás na lista! 🎉',
      successBody: 'Obrigado por te inscreveres. Entraremos em contacto quando o FitGram estiver pronto para beta testers. Entretanto, partilha com outro treinador que possa ter interesse.',
    },
    footer: {
      tagline: 'A plataforma tudo-em-um para personal trainers.',
      links: ['Problema', 'Funcionalidades', 'Entrar na beta'],
      rights: '© 2026 FitGram. Feito por treinadores, para treinadores.',
    },
  },

  es: {
    nav: { cta: 'Únete a la beta — es gratis' },
    hero: {
      eyebrow: 'Para entrenadores personales',
      headPre: 'Gestiona todos tus clientes, entrenamientos y dietas en ',
      headHl: 'una sola app',
      headPost: ' — no en 5 herramientas distintas.',
      sub: 'FitGram es la plataforma todo-en-uno creada para entrenadores personales. Organiza clientes, envía planes y comunica — todo en un solo lugar.',
      ctaPrimary: 'Únete a la beta — es gratis',
      ctaSecondary: 'Mira cómo funciona ↓',
      trust: 'Sin spam. Cancela cuando quieras. Solo te escribiremos cuando esté listo.',
    },
    mock: {
      greet: 'Buenos días,',
      name: 'Coach Sofía 👋',
      active: 'Clientes activos',
      needCheckin: 'Para revisar',
      plansSent: 'Planes enviados',
      todayFocus: 'Foco de hoy',
      due: 'Revisar',
      onTrack: 'En camino',
      newMessage: 'Nuevo mensaje',
    },
    strip: {
      prefix: 'Reemplaza',
      items: ['hojas de cálculo', 'planes en PDF', 'hilos de WhatsApp', 'notas dispersas'],
    },
    problem: {
      eyebrow: 'El día a día',
      heading: '¿Te suena?',
      lead: 'Si gestionas clientes en media docena de apps, ya conoces el dolor.',
      pains: [
        {
          title: 'La info de los clientes está por todas partes',
          body: 'Contactos, chats de WhatsApp, notas sueltas. Olvidas quién necesita revisión.',
        },
        {
          title: 'Horas perdidas en copiar y pegar',
          body: 'Rehaces planes desde hojas antiguas. Cada cliente recibe un formato distinto.',
        },
        {
          title: 'Los mensajes se pierden',
          body: 'Las preguntas de coaching se pierden en chats personales — entre memes y grupos.',
        },
      ],
      closePre: 'La mayoría de los PTs llega a un techo en ',
      closeHl: '15–20 clientes',
      closePost: '. No porque no puedan entrenar a más — sino porque la administración se vuelve inmanejable.',
    },
    solution: {
      eyebrow: 'La solución',
      heading: 'Una plataforma. Todo lo que necesitas.',
      lead: 'Cada función elimina una frustración diaria — para entrenar a más personas sin el caos.',
      features: [
        {
          tag: '01 — Gestión de Clientes',
          title: 'Ve a cada cliente en un solo panel',
          body: 'Sigue sus objetivos, progreso e historial. Sabe exactamente quién necesita tu atención hoy — sin revisar chats para recordar cómo va cada uno.',
        },
        {
          tag: '02 — Entrenos y Dietas',
          title: 'Crea el plan una vez, asígnalo con un toque',
          body: 'Crea planes desde plantillas o desde cero. Tus clientes reciben planes limpios y estructurados en la app — sin PDFs caóticos ni enlaces de hojas rotos.',
        },
        {
          tag: '03 — Bandeja de Coaching',
          title: 'Chat de coaching, separado de tu vida',
          body: 'Mantén las conversaciones de coaching fuera de tu WhatsApp personal. Mensajes, cambios de planes y preguntas en un solo lugar — con todo el contexto.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Lo que dicen los entrenadores',
      heading: 'Hecho por entrenadores, para entrenadores',
      items: [
        {
          quote: 'Pasé de 3 apps y una hoja de cálculo a solo FitGram. Por fin dejé de perder de vista quién necesita qué.',
          name: 'Tester del concepto',
          role: 'Coach online · 12 clientes',
        },
        {
          quote: 'Enviar una semana de entrenos me llevaba toda una tarde. Ahora son un par de toques.',
          name: 'PT de gimnasio',
          role: 'Fuerza y acondicionamiento',
        },
        {
          quote: 'Las preguntas de mis clientes ya no se pierden entre memes. Todo está en un solo lugar.',
          name: 'PT independiente',
          role: 'Pérdida de peso y nutrición',
        },
      ],
      counterLabel: 'entrenadores en la lista de espera',
      builtBy: 'Hecho por entrenadores, para entrenadores.',
    },
    cta: {
      eyebrow: 'Acceso anticipado',
      heading: 'Sé de los primeros en probar FitGram',
      lead: 'Estamos creando la herramienta que nos habría gustado tener al empezar. Únete a la lista de espera y consigue acceso anticipado.',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@ejemplo.com',
      emailError: 'Introduce un email válido.',
      typeLabel: '¿Qué tipo de PT eres?',
      typePlaceholder: 'Selecciona…',
      typeOptions: [
        { value: 'Gym PT', label: 'PT de gimnasio' },
        { value: 'Online PT', label: 'PT online' },
        { value: 'Fitness Coach', label: 'Entrenador de fitness' },
        { value: 'Independent PT', label: 'PT independiente' },
      ],
      typeError: 'Selecciona tu tipo de PT.',
      nameLabel: 'Nombre',
      nameOptional: '(opcional)',
      namePlaceholder: 'Tu nombre',
      submit: 'Unirme a la lista de espera',
      submitting: 'Uniéndome…',
      trust: 'Sin spam. Cancela cuando quieras. Solo te escribiremos cuando esté listo.',
      errorGeneric: 'Algo salió mal — inténtalo de nuevo o escríbenos.',
      successTitle: '¡Estás en la lista! 🎉',
      successBody: 'Gracias por apuntarte. Te contactaremos cuando FitGram esté listo para beta testers. Mientras tanto, compártelo con otro entrenador a quien le pueda interesar.',
    },
    footer: {
      tagline: 'La plataforma todo-en-uno para entrenadores personales.',
      links: ['Problema', 'Funciones', 'Únete a la beta'],
      rights: '© 2026 FitGram. Hecho por entrenadores, para entrenadores.',
    },
  },
};

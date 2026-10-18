export type Locale = 'en' | 'pt' | 'es';

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

export interface Messages {
  nav: {
    cta: string;
    links: { problem: string; solution: string; offer: string; pricing: string; faq: string };
  };
  hero: {
    eyebrow: string;
    headPre: string;
    headHl: string;
    headPost: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    microcopy: string;
    trust: string;
    videoTitle: string;
    videoDuration: string;
    proofLabel: string;
    rating: string;
    ratingCount: string;
    floating: { title: string; value: string }[];
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
    headPre: string;
    headHl: string;
    sub: string;
    cards: { title: string; body: string }[];
    banner: { title: string; body: string };
  };
  solution: {
    eyebrow: string;
    headPre: string;
    headHl: string;
    lead: string;
    nodes: { title: string; body: string }[];
  };
  showcase: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: { quote: string; name: string; role: string }[];
    counterLabel: string;
    builtBy: string;
  };
  offer: {
    eyebrow: string;
    headPre: string;
    headHl: string;
    lead: string;
    highlight: { title: string; body: string };
    perks: { title: string; body: string }[];
    cta: string;
  };
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
  cta: {
    eyebrow: string;
    heading: string;
    lead: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    typeLabel: string;
    typePlaceholder: string;
    typeOptions: { value: string; label: string }[];
    typeError: string;
    clientsLabel: string;
    clientsPlaceholder: string;
    clientsOptions: { value: string; label: string }[];
    clientsError: string;
    toolsLabel: string;
    toolsHint: string;
    toolsOptions: { value: string; label: string }[];
    toolsError: string;
    toolsOtherPlaceholder: string;
    contactLabel: string;
    contactOptional: string;
    contactPlaceholder: string;
    callLabel: string;
    callOptional: string;
    callPlaceholder: string;
    callOptions: { value: string; label: string }[];
    painLabel: string;
    painOptional: string;
    painPlaceholder: string;
    submit: string;
    submitting: string;
    trust: string;
    errorGeneric: string;
    successTitle: string;
    successBody: string;
    successPs: string;
    dupTitle: string;
    dupBody: string;
  };
  footer: { tagline: string; links: string[]; rights: string };
}

export const messages: Record<Locale, Messages> = {
  en: {
    nav: {
      cta: 'I want to try FitGram',
      links: {
        problem: 'Problem',
        solution: 'Solution',
        offer: 'Offer',
        pricing: 'Pricing',
        faq: 'FAQ',
      },
    },
    hero: {
      eyebrow: 'For personal trainers',
      headPre: 'Your PT studio in your ',
      headHl: 'pocket',
      headPost: '.',
      sub: 'FitGram tells you who to talk to today, drafts the message, and you build the workout by tapping the body.',
      ctaPrimary: 'I want to try FitGram',
      ctaSecondary: 'See how it works ↓',
      microcopy: 'Free beta for a small group of personal trainers.',
      trust: "No spam. Unsubscribe anytime. We'll only email you when it's ready.",
      videoTitle: 'See how it works',
      videoDuration: '2 min video',
      proofLabel: 'Already chosen by PTs like you',
      rating: '4.9/5',
      ratingCount: 'personal trainers',
      floating: [
        { title: 'Plan completed', value: 'Plano 2' },
        { title: 'New trainee', value: '+1 this month' },
        { title: 'Growth this month', value: '+100%' },
        { title: "Today's tasks", value: '3 done' },
      ],
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
      eyebrow: 'The daily grind of a PT',
      headPre: 'If you’re a PT, you’ve probably felt ',
      headHl: 'this chaos.',
      sub: 'Managing clients shouldn’t eat half your day. See if any of these feel familiar.',
      cards: [
        {
          title: 'You dig through old WhatsApp chats',
          body: 'Just to figure out where a client left off.',
        },
        {
          title: 'You keep several versions of the same plan',
          body: 'Scattered across PDFs and documents.',
        },
        {
          title: 'You don’t always know who needs a follow-up',
          body: 'And important leads slip away.',
        },
        {
          title: 'As you gain clients, organising it all takes more and more time.',
          body: 'And the time you should spend coaching disappears.',
        },
      ],
      banner: {
        title: 'You shouldn’t have to choose between coaching and admin.',
        body: 'FitGram was built to give you back the time that’s yours.',
      },
    },
    solution: {
      eyebrow: 'The solution',
      headPre: 'Everything you need to coach clients in one ',
      headHl: 'simple system.',
      lead: 'FitGram brings your clients’ conversations, plans, documents and progress together so you can focus on what really matters: changing lives.',
      nodes: [
        { title: 'Conversations', body: 'Every conversation in one place.' },
        { title: 'Plans', body: 'Create and assign workouts and meal plans.' },
        { title: 'Schedule', body: 'Keep track of sessions and appointments.' },
        { title: 'Clients', body: 'See context, goals and full history.' },
        { title: 'Documents', body: 'Share and organise files easily.' },
      ],
    },
    showcase: {
      eyebrow: 'A peek inside',
      heading: 'See FitGram in action',
      items: [
        {
          title: 'All your clients in one place',
          body: 'Context, goals, and history at a glance — so you always know who needs you today.',
        },
        {
          title: 'Workouts, set by set',
          body: 'Build and assign training plans your clients actually follow — sets, reps and progressions, right in the app.',
        },
        {
          title: 'Diets, to the gram',
          body: 'Meal plans with macros and portions your clients stick to — no more messy PDFs or broken links.',
        },
        {
          title: 'Forms and photos, no filter',
          body: 'Clients submit check-in forms, progress photos and body metrics — it all lands on their profile, ready when you are.',
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
    offer: {
      eyebrow: 'The offer',
      headPre: 'Join as ',
      headHl: 'a Founding PT.',
      lead: 'What you get when you try FitGram:',
      highlight: {
        title: 'Be part of the beginning',
        body: 'Help us build the future of FitGram from day one.',
      },
      perks: [
        { title: 'Early beta access', body: 'Be among the first to use FitGram.' },
        { title: 'Direct contact with the team', body: 'A direct line to the people building it.' },
        { title: 'A say in the product', body: 'Influence what we build next.' },
        { title: '6 months free after launch', body: 'Keep using FitGram free for 6 months once we go public.' },
        { title: 'Lifetime discount', body: 'A founder’s discount that stays with you for good.' },
      ],
      cta: 'Reserve your beta spot',
    },
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
          q: 'Is FitGram available yet?',
          a: 'Not yet. We’re opening a private beta for a small group of PTs first.',
        },
        {
          q: 'How much does it cost?',
          a: 'During the beta, access is completely free.',
        },
        {
          q: 'Do I have to change how I work?',
          a: 'No. We want to understand how you work today so we can build something that genuinely helps you.',
        },
        {
          q: 'What do you expect from me?',
          a: 'Honest feedback while you use the platform.',
        },
      ],
    },
    cta: {
      eyebrow: 'Reserve your spot',
      heading: 'Apply for the FitGram beta',
      lead: 'Tell us a bit about how you work today. We’re selecting a small group of PTs for the first version.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      nameError: 'Please enter your name.',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      emailError: 'Please enter a valid email address.',
      typeLabel: 'What kind of PT are you?',
      typePlaceholder: 'Select one…',
      typeOptions: [
        { value: 'in-person', label: 'In-person' },
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
      typeError: 'Please select your type of PT.',
      clientsLabel: 'Roughly how many clients do you have?',
      clientsPlaceholder: 'Select a range…',
      clientsOptions: [
        { value: '0-5', label: '0–5' },
        { value: '6-15', label: '6–15' },
        { value: '16-30', label: '16–30' },
        { value: '30+', label: '30+' },
      ],
      clientsError: 'Please select a range.',
      toolsLabel: 'What do you use to manage clients today?',
      toolsHint: 'Select all that apply.',
      toolsOptions: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'excel', label: 'Excel / Sheets' },
        { value: 'pdf', label: 'PDFs' },
        { value: 'notes', label: 'Notes / Notion' },
        { value: 'calendar', label: 'Calendar / agenda' },
        { value: 'other-app', label: 'Another app' },
        { value: 'memory', label: 'Nothing / memory' },
      ],
      toolsError: 'Please select at least one.',
      toolsOtherPlaceholder: 'Which app? Tell us…',
      contactLabel: 'Instagram or preferred contact',
      contactOptional: '(optional)',
      contactPlaceholder: '@yourhandle or phone',
      callLabel: 'Open to a quick call?',
      callOptional: '(optional)',
      callPlaceholder: 'Select one…',
      callOptions: [
        { value: 'yes', label: 'Yes, happy to' },
        { value: 'maybe', label: 'Maybe later' },
        { value: 'no', label: 'Prefer not to' },
      ],
      painLabel: 'What’s the task that eats most of your time today?',
      painOptional: '(optional)',
      painPlaceholder: 'e.g. rebuilding plans, chasing check-ins…',
      submit: 'Reserve my beta spot',
      submitting: 'Sending…',
      trust: 'No spam. No card. We’ll only contact you about the FitGram beta.',
      errorGeneric: 'Something went wrong — please try again or email us directly.',
      successTitle: 'You’re on the FitGram beta list.',
      successBody: 'Thanks for your interest. We’re selecting a small group of PTs to test the first version with close support. We’ll review every application and reach out about next steps if your profile fits this round.',
      successPs: 'In the meantime, reply to our email with one line: what’s the most annoying part of managing clients today?',
      dupTitle: 'You’re already on the list',
      dupBody: 'This email has already applied to the FitGram beta. Hang tight — we’ll be in touch.',
    },
    footer: {
      tagline: 'The all-in-one platform for personal trainers.',
      links: ['Problem', 'Features', 'Join the beta'],
      rights: '© 2026 FitGram.',
    },
  },

  pt: {
    nav: {
      cta: 'Quero testar o FitGram',
      links: {
        problem: 'Problema',
        solution: 'Solução',
        offer: 'Oferta',
        pricing: 'Preços',
        faq: 'FAQ',
      },
    },
    hero: {
      eyebrow: 'Para personal trainers',
      headPre: 'O teu estúdio de PT no ',
      headHl: 'bolso',
      headPost: '.',
      sub: 'O FitGram diz-te com quem falar hoje, prepara a mensagem, e tu constróis o treino tocando no corpo.',
      ctaPrimary: 'Quero testar o FitGram',
      ctaSecondary: 'Vê como funciona ↓',
      microcopy: 'Beta gratuita para um grupo pequeno de Personal Trainers.',
      trust: 'Sem spam. Cancela quando quiseres. Só te enviamos email quando estiver pronto.',
      videoTitle: 'Ver como funciona',
      videoDuration: '2 min de vídeo',
      proofLabel: 'Já escolhido por PTs como tu',
      rating: '4.9/5',
      ratingCount: 'personal trainers',
      floating: [
        { title: 'Plano concluído', value: 'Plano 2' },
        { title: 'Novo cliente', value: '+1 este mês' },
        { title: 'Crescimento este mês', value: '+100%' },
        { title: 'Tarefas de hoje', value: '3 concluídas' },
      ],
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
      eyebrow: 'O dia a dia de um PT',
      headPre: 'Se és PT, provavelmente já sentiste ',
      headHl: 'este caos.',
      sub: 'Gerir clientes não devia ocupar metade do teu dia. Vê se alguma destas situações te parece familiar.',
      cards: [
        {
          title: 'Procuras conversas antigas no WhatsApp',
          body: 'Para perceber o ponto em que um cliente ficou.',
        },
        {
          title: 'Tens várias versões do mesmo plano',
          body: 'Espalhadas por PDFs e documentos.',
        },
        {
          title: 'Nem sempre sabes quem precisa de um follow-up',
          body: 'E leads importantes acabam por escapar.',
        },
        {
          title: 'À medida que ganhas clientes, organizar tudo ocupa cada vez mais tempo.',
          body: 'E o tempo que devias investir em treinar, desaparece.',
        },
      ],
      banner: {
        title: 'Não devias ter de escolher entre treinar e gerir.',
        body: 'O FitGram foi criado para te devolver o tempo que é teu.',
      },
    },
    solution: {
      eyebrow: 'A solução',
      headPre: 'Tudo o que precisas para acompanhar clientes num ',
      headHl: 'sistema simples.',
      lead: 'O FitGram centraliza conversas, planos, documentos e progresso dos teus clientes para que possas focar no que realmente importa: transformar vidas.',
      nodes: [
        { title: 'Conversas', body: 'Todas as conversas num só lugar.' },
        { title: 'Planos', body: 'Cria e atribui treinos e planos alimentares.' },
        { title: 'Agenda', body: 'Acompanha sessões e compromissos.' },
        { title: 'Clientes', body: 'Vê contexto, objetivos e histórico completo.' },
        { title: 'Documentos', body: 'Partilha e organiza ficheiros facilmente.' },
      ],
    },
    showcase: {
      eyebrow: 'Por dentro',
      heading: 'Vê o FitGram em ação',
      items: [
        {
          title: 'Todos os clientes num só lugar',
          body: 'Contexto, objetivos e histórico num relance — para saberes sempre quem precisa de ti hoje.',
        },
        {
          title: 'Treinos em série',
          body: 'Cria e atribui planos de treino que os clientes seguem mesmo — séries, reps e progressões, direto na app.',
        },
        {
          title: 'Dietas à grama',
          body: 'Planos alimentares com macros e porções que os clientes cumprem — sem PDFs confusos nem links partidos.',
        },
        {
          title: 'Formulários e fotos, sem filtros',
          body: 'Os clientes enviam formulários de check-in, fotos de progresso e métricas corporais — cai tudo no perfil, pronto quando precisares.',
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
    offer: {
      eyebrow: 'A oferta',
      headPre: 'Entra como ',
      headHl: 'PT Fundador.',
      lead: 'O que recebes se testares o FitGram:',
      highlight: {
        title: 'Faz parte do início',
        body: 'Ajuda-nos a construir o futuro do FitGram desde o primeiro dia.',
      },
      perks: [
        { title: 'Acesso antecipado à beta', body: 'Sê dos primeiros a usar o FitGram.' },
        { title: 'Contacto direto com a equipa', body: 'Uma linha direta com quem o constrói.' },
        { title: 'Possibilidade de influenciar o produto', body: 'A tua opinião molda o que construímos a seguir.' },
        { title: '6 meses gratuitos após o lançamento', body: 'Continua a usar o FitGram grátis durante 6 meses após o lançamento.' },
        { title: 'Desconto vitalício', body: 'Um desconto de fundador que fica contigo para sempre.' },
      ],
      cta: 'Reservar acesso à beta',
    },
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
          q: 'O FitGram já está disponível?',
          a: 'Ainda não. Estamos a abrir uma beta privada para um grupo reduzido de PTs.',
        },
        {
          q: 'Quanto custa?',
          a: 'Durante a beta o acesso é totalmente gratuito.',
        },
        {
          q: 'Preciso de mudar a forma como trabalho?',
          a: 'Não. Queremos perceber como trabalhas hoje para construir algo que realmente te ajude.',
        },
        {
          q: 'O que esperam de mim?',
          a: 'Feedback honesto enquanto utilizas a plataforma.',
        },
      ],
    },
    cta: {
      eyebrow: 'Reserva o teu lugar',
      heading: 'Candidata-te à beta do FitGram',
      lead: 'Conta-nos um pouco sobre como trabalhas hoje. Estamos a selecionar um grupo pequeno de PTs para a primeira versão.',
      nameLabel: 'Nome',
      namePlaceholder: 'O teu nome',
      nameError: 'Indica o teu nome.',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@exemplo.com',
      emailError: 'Introduz um email válido.',
      typeLabel: 'Que tipo de PT és?',
      typePlaceholder: 'Seleciona…',
      typeOptions: [
        { value: 'in-person', label: 'Presencial' },
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Híbrido' },
      ],
      typeError: 'Seleciona o teu tipo de PT.',
      clientsLabel: 'Quantos clientes tens, aproximadamente?',
      clientsPlaceholder: 'Seleciona um intervalo…',
      clientsOptions: [
        { value: '0-5', label: '0–5' },
        { value: '6-15', label: '6–15' },
        { value: '16-30', label: '16–30' },
        { value: '30+', label: '30+' },
      ],
      clientsError: 'Seleciona um intervalo.',
      toolsLabel: 'O que usas hoje para gerir clientes?',
      toolsHint: 'Seleciona tudo o que se aplica.',
      toolsOptions: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'excel', label: 'Excel / Folhas' },
        { value: 'pdf', label: 'PDFs' },
        { value: 'notes', label: 'Notas / Notion' },
        { value: 'calendar', label: 'Agenda / Calendário' },
        { value: 'other-app', label: 'Outra app' },
        { value: 'memory', label: 'Nada / memória' },
      ],
      toolsError: 'Seleciona pelo menos uma.',
      toolsOtherPlaceholder: 'Qual app? Diz-nos…',
      contactLabel: 'Instagram ou contacto preferido',
      contactOptional: '(opcional)',
      contactPlaceholder: '@o_teu_perfil ou telemóvel',
      callLabel: 'Disponível para uma call rápida?',
      callOptional: '(opcional)',
      callPlaceholder: 'Seleciona…',
      callOptions: [
        { value: 'yes', label: 'Sim, com todo o gosto' },
        { value: 'maybe', label: 'Talvez mais tarde' },
        { value: 'no', label: 'Prefiro não' },
      ],
      painLabel: 'Qual é hoje a tarefa que mais tempo te faz perder?',
      painOptional: '(opcional)',
      painPlaceholder: 'ex.: refazer planos, andar atrás de check-ins…',
      submit: 'Reservar o meu lugar na beta',
      submitting: 'A enviar…',
      trust: 'Sem spam. Sem cartão. Vamos contactar-te apenas sobre a beta do FitGram.',
      errorGeneric: 'Algo correu mal — tenta novamente ou envia-nos email.',
      successTitle: 'Estás na lista da beta do FitGram.',
      successBody: 'Obrigado pelo interesse. Estamos a selecionar um grupo pequeno de PTs para testar a primeira versão com acompanhamento próximo. Vamos analisar todas as candidaturas e, caso o teu perfil seja selecionado para esta vaga, entraremos em contacto contigo para os próximos passos.',
      successPs: 'Entretanto, podes responder ao nosso email com uma frase: qual é hoje a parte mais chata de gerir clientes?',
      dupTitle: 'Já estás na lista',
      dupBody: 'Este email já se candidatou à beta do FitGram. Aguarda — entraremos em contacto.',
    },
    footer: {
      tagline: 'A plataforma tudo-em-um para personal trainers.',
      links: ['Problema', 'Funcionalidades', 'Entrar na beta'],
      rights: '© 2026 FitGram.',
    },
  },

  es: {
    nav: {
      cta: 'Quiero probar FitGram',
      links: {
        problem: 'Problema',
        solution: 'Solución',
        offer: 'Oferta',
        pricing: 'Precios',
        faq: 'FAQ',
      },
    },
    hero: {
      eyebrow: 'Para entrenadores personales',
      headPre: 'Tu estudio de PT en el ',
      headHl: 'bolsillo',
      headPost: '.',
      sub: 'FitGram te dice con quién hablar hoy, prepara el mensaje y tú construyes el entrenamiento tocando el cuerpo.',
      ctaPrimary: 'Quiero probar FitGram',
      ctaSecondary: 'Mira cómo funciona ↓',
      microcopy: 'Beta gratuita para un grupo pequeño de entrenadores personales.',
      trust: 'Sin spam. Cancela cuando quieras. Solo te escribiremos cuando esté listo.',
      videoTitle: 'Mira cómo funciona',
      videoDuration: '2 min de vídeo',
      proofLabel: 'Ya elegido por PTs como tú',
      rating: '4.9/5',
      ratingCount: 'entrenadores',
      floating: [
        { title: 'Plan completado', value: 'Plano 2' },
        { title: 'Nuevo cliente', value: '+1 este mes' },
        { title: 'Crecimiento este mes', value: '+100%' },
        { title: 'Tareas de hoy', value: '3 hechas' },
      ],
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
      eyebrow: 'El día a día de un PT',
      headPre: 'Si eres PT, seguramente ya has sentido ',
      headHl: 'este caos.',
      sub: 'Gestionar clientes no debería ocupar la mitad de tu día. Mira si alguna de estas situaciones te suena.',
      cards: [
        {
          title: 'Buscas conversaciones antiguas en WhatsApp',
          body: 'Solo para saber en qué punto se quedó un cliente.',
        },
        {
          title: 'Tienes varias versiones del mismo plan',
          body: 'Repartidas por PDFs y documentos.',
        },
        {
          title: 'No siempre sabes quién necesita un seguimiento',
          body: 'Y leads importantes acaban escapando.',
        },
        {
          title: 'A medida que ganas clientes, organizarlo todo ocupa cada vez más tiempo.',
          body: 'Y el tiempo que deberías dedicar a entrenar desaparece.',
        },
      ],
      banner: {
        title: 'No deberías tener que elegir entre entrenar y gestionar.',
        body: 'FitGram se creó para devolverte el tiempo que es tuyo.',
      },
    },
    solution: {
      eyebrow: 'La solución',
      headPre: 'Todo lo que necesitas para acompañar a tus clientes en un ',
      headHl: 'sistema simple.',
      lead: 'FitGram centraliza las conversaciones, planes, documentos y progreso de tus clientes para que puedas centrarte en lo que de verdad importa: transformar vidas.',
      nodes: [
        { title: 'Conversaciones', body: 'Todas las conversaciones en un solo lugar.' },
        { title: 'Planes', body: 'Crea y asigna entrenamientos y planes de alimentación.' },
        { title: 'Agenda', body: 'Controla sesiones y citas.' },
        { title: 'Clientes', body: 'Ve contexto, objetivos e historial completo.' },
        { title: 'Documentos', body: 'Comparte y organiza archivos fácilmente.' },
      ],
    },
    showcase: {
      eyebrow: 'Por dentro',
      heading: 'Mira FitGram en acción',
      items: [
        {
          title: 'Todos tus clientes en un solo lugar',
          body: 'Contexto, objetivos e historial de un vistazo — para saber siempre quién te necesita hoy.',
        },
        {
          title: 'Entrenamientos, serie a serie',
          body: 'Crea y asigna planes de entrenamiento que tus clientes siguen de verdad — series, reps y progresiones, en la app.',
        },
        {
          title: 'Dietas, al gramo',
          body: 'Planes de comidas con macros y porciones que tus clientes cumplen — sin PDFs caóticos ni enlaces rotos.',
        },
        {
          title: 'Formularios y fotos, sin filtro',
          body: 'Los clientes envían formularios de check-in, fotos de progreso y métricas corporales — todo llega a su perfil, listo cuando lo necesites.',
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
    offer: {
      eyebrow: 'La oferta',
      headPre: 'Únete como ',
      headHl: 'PT Fundador.',
      lead: 'Lo que recibes si pruebas FitGram:',
      highlight: {
        title: 'Forma parte del inicio',
        body: 'Ayúdanos a construir el futuro de FitGram desde el primer día.',
      },
      perks: [
        { title: 'Acceso anticipado a la beta', body: 'Sé de los primeros en usar FitGram.' },
        { title: 'Contacto directo con el equipo', body: 'Una línea directa con quien lo construye.' },
        { title: 'Posibilidad de influir en el producto', body: 'Tu opinión moldea lo que construimos.' },
        { title: '6 meses gratis tras el lanzamiento', body: 'Sigue usando FitGram gratis durante 6 meses tras el lanzamiento.' },
        { title: 'Descuento de por vida', body: 'Un descuento de fundador que se queda contigo para siempre.' },
      ],
      cta: 'Reservar acceso a la beta',
    },
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
          q: '¿FitGram ya está disponible?',
          a: 'Todavía no. Estamos abriendo una beta privada para un grupo reducido de PTs.',
        },
        {
          q: '¿Cuánto cuesta?',
          a: 'Durante la beta el acceso es totalmente gratuito.',
        },
        {
          q: '¿Tengo que cambiar mi forma de trabajar?',
          a: 'No. Queremos entender cómo trabajas hoy para construir algo que realmente te ayude.',
        },
        {
          q: '¿Qué esperáis de mí?',
          a: 'Feedback honesto mientras usas la plataforma.',
        },
      ],
    },
    cta: {
      eyebrow: 'Reserva tu lugar',
      heading: 'Solicita la beta de FitGram',
      lead: 'Cuéntanos un poco cómo trabajas hoy. Estamos seleccionando un grupo pequeño de PTs para la primera versión.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      nameError: 'Indica tu nombre.',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@ejemplo.com',
      emailError: 'Introduce un email válido.',
      typeLabel: '¿Qué tipo de PT eres?',
      typePlaceholder: 'Selecciona…',
      typeOptions: [
        { value: 'in-person', label: 'Presencial' },
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Híbrido' },
      ],
      typeError: 'Selecciona tu tipo de PT.',
      clientsLabel: '¿Cuántos clientes tienes, aproximadamente?',
      clientsPlaceholder: 'Selecciona un rango…',
      clientsOptions: [
        { value: '0-5', label: '0–5' },
        { value: '6-15', label: '6–15' },
        { value: '16-30', label: '16–30' },
        { value: '30+', label: '30+' },
      ],
      clientsError: 'Selecciona un rango.',
      toolsLabel: '¿Qué usas hoy para gestionar clientes?',
      toolsHint: 'Selecciona todo lo que aplique.',
      toolsOptions: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'excel', label: 'Excel / Hojas' },
        { value: 'pdf', label: 'PDFs' },
        { value: 'notes', label: 'Notas / Notion' },
        { value: 'calendar', label: 'Agenda / Calendario' },
        { value: 'other-app', label: 'Otra app' },
        { value: 'memory', label: 'Nada / memoria' },
      ],
      toolsError: 'Selecciona al menos una.',
      toolsOtherPlaceholder: '¿Qué app? Cuéntanos…',
      contactLabel: 'Instagram o contacto preferido',
      contactOptional: '(opcional)',
      contactPlaceholder: '@tu_perfil o teléfono',
      callLabel: '¿Te apuntas a una llamada rápida?',
      callOptional: '(opcional)',
      callPlaceholder: 'Selecciona…',
      callOptions: [
        { value: 'yes', label: 'Sí, encantado' },
        { value: 'maybe', label: 'Quizá más tarde' },
        { value: 'no', label: 'Prefiero no' },
      ],
      painLabel: '¿Cuál es hoy la tarea que más tiempo te hace perder?',
      painOptional: '(opcional)',
      painPlaceholder: 'p. ej. rehacer planes, perseguir check-ins…',
      submit: 'Reservar mi lugar en la beta',
      submitting: 'Enviando…',
      trust: 'Sin spam. Sin tarjeta. Solo te contactaremos sobre la beta de FitGram.',
      errorGeneric: 'Algo salió mal — inténtalo de nuevo o escríbenos.',
      successTitle: 'Estás en la lista de la beta de FitGram.',
      successBody: 'Gracias por tu interés. Estamos seleccionando un grupo pequeño de PTs para probar la primera versión con acompañamiento cercano. Revisaremos todas las candidaturas y te contactaremos sobre los próximos pasos si tu perfil encaja en esta ronda.',
      successPs: 'Mientras tanto, responde a nuestro email con una frase: ¿cuál es hoy la parte más molesta de gestionar clientes?',
      dupTitle: 'Ya estás en la lista',
      dupBody: 'Este email ya se ha postulado a la beta de FitGram. Espera — te contactaremos.',
    },
    footer: {
      tagline: 'La plataforma todo-en-uno para entrenadores personales.',
      links: ['Problema', 'Funciones', 'Únete a la beta'],
      rights: '© 2026 FitGram.',
    },
  },
};

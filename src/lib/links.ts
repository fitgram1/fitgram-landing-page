/**
 * Destinos dos CTAs. A landing é a página pública do FitGram e os botões levam à app.
 *
 * - App web (login/registo reais): https://app.fitgram.pt, ou outra via `VITE_APP_URL`
 *   (útil para apontar a staging ao testar).
 * - Lojas: os botões da App Store e do Google Play só aparecem quando existem os links
 *   (`VITE_APP_STORE_URL` e `VITE_PLAY_STORE_URL`); sem eles não há botões mortos.
 */
const DEFAULT_APP_URL = 'https://app.fitgram.pt';

const env = (value: unknown): string | null => {
  const v = typeof value === 'string' ? value.trim().replace(/\/$/, '') : '';
  return v.length > 0 ? v : null;
};

const appUrl = env(import.meta.env.VITE_APP_URL) ?? DEFAULT_APP_URL;

export const routes = {
  home: '/',
  faq: '/perguntas-frequentes',
  /** Rota antiga da candidatura à beta: hoje só redireciona para a página inicial. */
  legacyWaitlist: '/lista-de-espera',
  /** Endereço antigo da página de preços: leva à secção #precos da página inicial. */
  legacyPricing: '/precos',
} as const;

export const links = {
  /** Visão geral do produto (cena da história onde o treino ganha forma). */
  explore: '/#explorar',
  trainers: '/#treinadores',
  /** Secção «Começa já» no fim da página inicial. */
  getStarted: '/#comecar',
  appUrl,
  login: `${appUrl}/login`,
  signup: `${appUrl}/signup`,
  privacy: `${appUrl}/privacy`,
  terms: `${appUrl}/terms`,
  appStore: env(import.meta.env.VITE_APP_STORE_URL),
  playStore: env(import.meta.env.VITE_PLAY_STORE_URL),
  contact: 'mailto:fitgrampt@gmail.com',
  /** «Tenho interesse»: um email com o assunto já escrito (na língua da página). */
  interest: (subject: string) => `mailto:fitgrampt@gmail.com?subject=${encodeURIComponent(subject)}`,
  /** Perfil do FitGram no Instagram. */
  instagram: 'https://www.instagram.com/fitgram_app/',
} as const;

/** Host da app web sem protocolo, para mostrar no texto (ex.: «app.fitgram.pt»). */
export const appHost = appUrl.replace(/^https?:\/\//, '');

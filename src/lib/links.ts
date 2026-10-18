/**
 * Destinos dos CTAs. A app web (login/registo reais) é configurada por ambiente:
 *   VITE_APP_URL=https://… yarn build
 * Sem a variável não existe página de autenticação: "Começar" leva à candidatura
 * à beta (rota real desta landing) e "Entrar" não é apresentado (sem destino, sem botão morto).
 */
const raw = (import.meta.env.VITE_APP_URL as string | undefined)?.replace(/\/$/, '');

export const routes = {
  home: '/',
  pricing: '/precos',
  faq: '/perguntas-frequentes',
  waitlist: '/lista-de-espera',
} as const;

export const links = {
  waitlist: routes.waitlist,
  /** Visão geral do produto (cena da história onde o treino ganha forma). */
  explore: '/#explorar',
  trainers: '/#treinadores',
  login: raw ? `${raw}/login` : null,
  signup: raw ? `${raw}/register` : routes.waitlist,
  hasApp: !!raw,
  contact: 'mailto:fitgrampt@gmail.com',
} as const;

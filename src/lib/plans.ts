/**
 * Planos e funcionalidades mostrados na landing (tabela «Planos e
 * Funcionalidades» da FitGram). Preços mensais em cêntimos de euro.
 */
export type PlanSlug = 'free' | 'starter' | 'pro' | 'business';

export interface Plan {
  slug: PlanSlug;
  name: string;
  /** Por mês, em cêntimos. */
  price: number;
  maxTrainees: number;
  aiCredits: number;
  /** O plano em destaque (sem etiqueta, só o contorno). */
  highlight?: boolean;
}

export const CURRENCY = 'EUR';

export const PLANS: Plan[] = [
  { slug: 'free', name: 'Free', price: 0, maxTrainees: 5, aiCredits: 100 },
  { slug: 'starter', name: 'Starter', price: 1900, maxTrainees: 30, aiCredits: 2000 },
  { slug: 'pro', name: 'Pro', price: 3900, maxTrainees: 100, aiCredits: 5000, highlight: true },
  { slug: 'business', name: 'Business', price: 7900, maxTrainees: 250, aiCredits: 10000 },
];

/**
 * O que cada plano tem, linha a linha: incluído, não incluído, os créditos
 * de IA do plano, ou um texto (chave em `pricing.values`).
 */
export type Cell =
  | { kind: 'yes' }
  | { kind: 'no' }
  | { kind: 'credits' }
  | { kind: 'text'; value: ValueKey; check?: boolean };

export type ValueKey = 'automations' | 'onePlan' | 'upTo10' | 'unlimited' | 'basic' | 'advanced';

export type FeatureKey =
  | 'training'
  | 'nutrition'
  | 'recipes'
  | 'supplements'
  | 'progress'
  | 'agenda'
  | 'ai'
  | 'insights'
  | 'challenges'
  | 'library'
  | 'releases'
  | 'customization'
  | 'teams';

const Y: Cell = { kind: 'yes' };
const N: Cell = { kind: 'no' };
const AI: Cell = { kind: 'credits' };
const txt = (value: ValueKey, check = false): Cell => ({ kind: 'text', value, check });

/**
 * Linhas da tabela, pela ordem: Free, Starter, Pro, Business. Só as que
 * mudam de plano para plano aparecem na tabela (ver `COMPARED_FEATURES`).
 */
export const FEATURES: { key: FeatureKey; cells: [Cell, Cell, Cell, Cell] }[] = [
  { key: 'training', cells: [Y, Y, Y, Y] },
  { key: 'nutrition', cells: [Y, Y, Y, Y] },
  { key: 'recipes', cells: [N, N, Y, Y] },
  { key: 'supplements', cells: [Y, Y, Y, Y] },
  { key: 'progress', cells: [Y, Y, Y, Y] },
  { key: 'agenda', cells: [Y, Y, txt('automations', true), txt('automations', true)] },
  { key: 'ai', cells: [AI, AI, AI, AI] },
  { key: 'insights', cells: [N, N, Y, Y] },
  { key: 'challenges', cells: [N, Y, Y, Y] },
  { key: 'library', cells: [txt('onePlan'), txt('upTo10'), txt('unlimited'), txt('unlimited')] },
  { key: 'releases', cells: [N, N, Y, Y] },
  { key: 'customization', cells: [txt('basic'), txt('basic'), txt('advanced'), txt('advanced')] },
  { key: 'teams', cells: [N, N, N, Y] },
];

export function formatMoney(cents: number, htmlLang: string): string {
  return new Intl.NumberFormat(htmlLang, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatNumber(n: number, htmlLang: string): string {
  // «2 000» as well as «10 000»: Portuguese only groups from 10 000 by
  // default, so the language's own separator is put in every three digits.
  const sep =
    new Intl.NumberFormat(htmlLang).formatToParts(10000).find((p) => p.type === 'group')?.value ?? ' ';
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/** Em todos os planos: dito numa linha, fora da tabela. */
export const SHARED_FEATURES: FeatureKey[] = FEATURES.filter((row) =>
  row.cells.every((c) => c.kind === 'yes'),
).map((row) => row.key);

/**
 * O que a tabela compara. Ficam de fora a IA (os créditos já estão nos
 * cartões), Desafios e Lançamentos (a pedido, para a tabela ser curta) e o
 * que todos os planos têm.
 */
const HIDDEN_FEATURES: FeatureKey[] = ['ai', 'challenges', 'releases'];

export const COMPARED_FEATURES = FEATURES.filter(
  (row) => !HIDDEN_FEATURES.includes(row.key) && !SHARED_FEATURES.includes(row.key),
);

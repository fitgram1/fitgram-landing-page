/**
 * Planos e preços mostrados na landing.
 * Fonte: fitgram-be/migrations/data/plans.json (FreeGram, ProFitGram, SharkFitGram).
 * Se os preços mudarem no backend, muda-os aqui também. Valores em cêntimos de euro.
 */
export type PlanFeature =
  | 'basic_trainee_management'
  | 'training_templates'
  | 'nutrition_templates'
  | 'automated_reminders'
  | 'advanced_analytics'
  | 'custom_branding'
  | 'white_label'
  | 'trainee_groups'
  | 'exercise_3d_builder'
  | 'automated_checkins'
  | 'priority_support';

export interface Plan {
  slug: 'freegram' | 'profitgram' | 'sharkfitgram';
  name: string;
  maxTrainees: number;
  /** Preço total por período (meses → cêntimos). Vazio = grátis. */
  prices: Partial<Record<Period, number>>;
  features: PlanFeature[];
  recommended?: boolean;
}

export const PERIODS = [1, 3, 6, 12, 24] as const;
export type Period = (typeof PERIODS)[number];

export const CURRENCY = 'EUR';

export const PLANS: Plan[] = [
  {
    slug: 'freegram',
    name: 'FreeGram',
    maxTrainees: 3,
    prices: {},
    features: ['basic_trainee_management'],
  },
  {
    slug: 'profitgram',
    name: 'ProFitGram',
    maxTrainees: 30,
    prices: { 1: 1799, 3: 5127, 6: 9714, 12: 16191, 24: 28064 },
    features: ['basic_trainee_management', 'training_templates', 'nutrition_templates', 'automated_reminders', 'advanced_analytics'],
    recommended: true,
  },
  {
    slug: 'sharkfitgram',
    name: 'SharkFitGram',
    maxTrainees: 999,
    prices: { 1: 2999, 3: 8547, 6: 16194, 12: 26991, 24: 46784 },
    features: [
      'basic_trainee_management',
      'training_templates',
      'nutrition_templates',
      'custom_branding',
      'white_label',
      'trainee_groups',
      'exercise_3d_builder',
      'advanced_analytics',
      'automated_reminders',
      'automated_checkins',
      'priority_support',
    ],
  },
];

/** Poupança (%) de um período face a pagar mês a mês. */
export function savingPct(plan: Plan, period: Period): number {
  const monthly = plan.prices[1];
  const total = plan.prices[period];
  if (!monthly || !total || period === 1) return 0;
  return Math.round((1 - total / (monthly * period)) * 100);
}

export function formatMoney(cents: number, htmlLang: string): string {
  return new Intl.NumberFormat(htmlLang, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

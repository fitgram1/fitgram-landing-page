import { useState, type ComponentType } from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  ChefHat,
  ChevronDown,
  Dumbbell,
  Layers,
  LineChart,
  Minus,
  Pill,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  Target,
  User,
  Users,
  UtensilsCrossed,
  Zap,
  type LucideProps,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/ui/button';
import { fmt, useT } from '@/i18n';
import { links } from '@/lib/links';
import {
  COMPARED_FEATURES,
  PLANS,
  SHARED_FEATURES,
  formatMoney,
  formatNumber,
  type Cell,
  type FeatureKey,
  type Plan,
  type PlanSlug,
} from '@/lib/plans';
import { cn } from '@/lib/utils';

type Icon = ComponentType<LucideProps>;

const PLAN_ICON: Record<PlanSlug, Icon> = {
  free: Rocket,
  starter: User,
  pro: Zap,
  business: Users,
};

const FEATURE_ICON: Record<FeatureKey, Icon> = {
  training: Dumbbell,
  nutrition: UtensilsCrossed,
  recipes: ChefHat,
  supplements: Pill,
  progress: BarChart3,
  agenda: CalendarCheck,
  ai: Sparkles,
  insights: LineChart,
  challenges: Target,
  library: Layers,
  releases: Rocket,
  customization: SlidersHorizontal,
  teams: Users,
};

/** Planos (cartões) e, a pedido, a tabela completa de funcionalidades. */
export function Pricing() {
  const t = useT();
  const pr = t.pricing;
  const [compare, setCompare] = useState(false);

  return (
    <section id="precos" aria-labelledby="precos-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden py-10 md:py-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="container relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="precos-title" className="text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-tight">
              {pr.title}
            </h2>
            <p className="mt-2 text-[16px] text-muted-foreground">{pr.sub}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-6xl items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.slug} delay={120 + i * 90} from="scale" className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            aria-expanded={compare}
            aria-controls="precos-comparar"
            onClick={() => setCompare((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[14px] font-bold outline-none transition-colors hover:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Layers className="size-4 text-primary" aria-hidden />
            {compare ? pr.hideCompare : pr.compare}
            <ChevronDown className={cn('size-4 transition-transform duration-300', compare && 'rotate-180')} aria-hidden />
          </button>
          <p className="text-center text-[12px] text-muted-foreground">{pr.note}</p>
        </div>

        {compare ? <FeatureTable /> : null}
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const t = useT();
  const pr = t.pricing;
  const lang = t.meta.htmlLang;
  const PlanIcon = PLAN_ICON[plan.slug];
  const free = plan.price === 0;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-3xl border bg-card p-6 transition-transform duration-300 hover:-translate-y-1',
        plan.highlight ? 'border-primary shadow-[0_0_0_1px_hsl(var(--primary)),0_18px_50px_-12px_hsl(var(--primary)/0.45)]' : 'border-border',
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', plan.highlight ? 'bg-primary text-white' : 'bg-primary/15 text-primary')}>
          <PlanIcon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{plan.name}</p>
          {/* Two lines kept for every card, so the prices line up. */}
          <p className="min-h-[2.6em] text-[13px] leading-[1.3] text-muted-foreground">{pr.plans[plan.slug]}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end gap-1.5">
        <span className="text-[40px] font-black leading-none tracking-tight tabular-nums">{formatMoney(plan.price, lang)}</span>
        <span className="pb-1.5 text-[14px] font-semibold text-muted-foreground">{pr.perMonth}</span>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-border pt-4">
        <p className="flex items-center gap-2 text-[14px]">
          <User className="size-4 text-muted-foreground" aria-hidden />
          <span>
            <span className="font-bold tabular-nums">{formatNumber(plan.maxTrainees, lang)}</span> {pr.trainees}
          </span>
        </p>
        <p className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/12 px-2.5 py-1.5 text-[11.5px] font-semibold text-primary">
          <Sparkles className="size-3.5" aria-hidden />
          {fmt(pr.aiCredits, { n: formatNumber(plan.aiCredits, lang) })}
        </p>
      </div>

      <ButtonLink
        href={links.signup}
        size="lg"
        variant={plan.highlight ? 'default' : 'outline'}
        className={cn('mt-auto w-full', plan.highlight && 'cta-shine')}
        style={{ marginTop: '1.5rem' }}
      >
        {free ? pr.ctaFree : pr.cta}
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    </div>
  );
}

function FeatureTable() {
  const t = useT();
  const pr = t.pricing;
  const lang = t.meta.htmlLang;

  const cell = (c: Cell, plan: Plan) => {
    if (c.kind === 'yes') return <Check className="mx-auto size-4 text-primary" aria-label={pr.included} />;
    if (c.kind === 'no') return <Minus className="mx-auto size-4 text-muted-foreground/60" aria-label={pr.notIncluded} />;
    if (c.kind === 'credits')
      return (
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-semibold text-primary">
          <Sparkles className="size-3" aria-hidden />
          {fmt(pr.values.credits, { n: formatNumber(plan.aiCredits, lang) })}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-[12px]">
        {c.check ? <Check className="size-3.5 text-primary" aria-hidden /> : null}
        {pr.values[c.value]}
      </span>
    );
  };

  // No scroll reveal here: the table is taller than the screen, so it never
  // crossed the reveal threshold and stayed invisible.
  return (
    <div>
      <p className="mx-auto mt-5 max-w-5xl text-center text-[13px] text-muted-foreground">
        <Check className="mr-1 inline size-4 align-[-3px] text-primary" aria-hidden />
        {fmt(pr.allPlans, { list: SHARED_FEATURES.map((k) => pr.features[k].title).join(', ') })}
      </p>
      <div id="precos-comparar" className="mx-auto mt-3 max-w-4xl overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">{pr.featuresTitle}</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-4 py-2.5 text-[14px] font-extrabold">
                {pr.featuresTitle}
              </th>
              {PLANS.map((plan) => (
                <th
                  key={plan.slug}
                  scope="col"
                  className={cn('w-[14%] px-2 py-2.5 text-center text-[13px] font-extrabold', plan.highlight && 'bg-primary/10 text-primary')}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARED_FEATURES.map((row) => {
              const RowIcon = FEATURE_ICON[row.key];
              const f = pr.features[row.key];
              return (
                <tr key={row.key} className="border-b border-border/60 last:border-b-0">
                  <th scope="row" className="px-4 py-2 font-normal">
                    {/* The description shows on hover, to keep the table short. */}
                    <span className="flex items-center gap-2.5" title={f.sub}>
                      <RowIcon className="size-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-[12.5px] font-bold leading-tight">{f.title}</span>
                    </span>
                  </th>
                  {row.cells.map((c, i) => (
                    <td key={PLANS[i].slug} className={cn('px-2 py-1.5 text-center', PLANS[i].highlight && 'bg-primary/5')}>
                      {cell(c, PLANS[i])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

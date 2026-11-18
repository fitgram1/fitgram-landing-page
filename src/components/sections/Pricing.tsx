import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/ui/button';
import { fmt, useT } from '@/i18n';
import { links } from '@/lib/links';
import { PERIODS, PLANS, formatMoney, savingPct, type Period, type Plan } from '@/lib/plans';
import { cn } from '@/lib/utils';

/** Planos e preços (valores em `lib/plans.ts`). */
export function Pricing() {
  const t = useT();
  const pr = t.pricing;
  const [period, setPeriod] = useState<Period>(12);
  const idx = PERIODS.indexOf(period);
  const maxSave = savingPct(PLANS[1], period);

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

        {/* períodos de faturação */}
        <Reveal delay={120}>
          <div className="mt-6 flex flex-col items-center gap-1.5">
            <div role="radiogroup" aria-label={pr.period} className="relative grid grid-cols-5 rounded-full border border-border bg-card p-1">
              <span
                aria-hidden
                className="absolute bottom-1 top-1 rounded-full bg-primary shadow-lg shadow-primary/40 transition-transform duration-300 ease-out"
                style={{ width: 'calc((100% - 0.5rem) / 5)', left: '0.25rem', transform: `translateX(${idx * 100}%)` }}
              />
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={p === period}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-bold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-5',
                    p === period ? 'text-white' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {p === 1 ? pr.month : fmt(pr.months, { n: p })}
                </button>
              ))}
            </div>
            <p className={cn('h-5 text-[13px] font-semibold text-primary transition-opacity', maxSave ? 'opacity-100' : 'opacity-0')}>
              {maxSave ? fmt(pr.save, { p: maxSave }) : ''}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-4 grid max-w-6xl items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.slug} delay={180 + i * 100} from="scale" className="h-full">
              <PlanCard plan={plan} period={period} />
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-[12px] text-muted-foreground">{pr.note}</p>
      </div>
    </section>
  );
}

function PlanCard({ plan, period }: { plan: Plan; period: Period }) {
  const t = useT();
  const pr = t.pricing;
  const lang = t.meta.htmlLang;
  const total = plan.prices[period];
  const free = total === undefined;
  const perMonth = free ? 0 : Math.round(total / period);
  const save = savingPct(plan, period);
  // Cada plano mostra só o que acrescenta ao anterior.
  const i = PLANS.findIndex((p) => p.slug === plan.slug);
  const prev = i > 0 ? PLANS[i - 1] : null;
  const own = prev ? plan.features.filter((f) => !prev.features.includes(f)) : plan.features;

  return (
    <div className={cn('relative h-full rounded-3xl p-[1.5px]', plan.recommended ? 'price-glow' : 'bg-border')}>
      <div className={cn('relative flex h-full flex-col rounded-[calc(1.5rem-1.5px)] p-6', plan.recommended ? 'bg-card' : 'bg-card/95')}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-extrabold tracking-tight">{plan.name}</p>
          <p className="text-[13px] text-muted-foreground">{fmt(pr.upTo, { n: plan.maxTrainees })}</p>
        </div>

        <div className="mt-4 flex items-end gap-1.5">
          <span key={`${plan.slug}-${period}-${lang}`} className="price-pop text-[38px] font-black leading-none tracking-tight tabular-nums">
            {free ? pr.free : formatMoney(perMonth, lang)}
          </span>
          {!free && <span className="pb-1.5 text-[14px] font-semibold text-muted-foreground">{pr.perMonth}</span>}
        </div>
        <p className="mt-2 h-5 text-[13px] text-muted-foreground">
          {free ? pr.forever : period === 1 ? '' : fmt(pr.billed, { total: formatMoney(total, lang), n: period })}
          {save > 0 && <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">−{save}%</span>}
        </p>

        <ButtonLink href={links.signup} size="lg" variant={plan.recommended ? 'default' : 'outline'} className={cn('mt-5 w-full', plan.recommended && 'cta-shine')}>
          {free ? pr.ctaFree : pr.cta}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>

        <ul className="mt-5 space-y-2 border-t border-border pt-4">
          {prev && <li className="text-[13px] font-semibold text-foreground">{fmt(pr.everythingIn, { plan: prev.name })}</li>}
          {own.map((f) => (
            <li key={f} className="flex gap-2.5 text-[13.5px] leading-snug">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3" aria-hidden />
              </span>
              {pr.features[f]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { PublicPageLayout, PublicContainer } from '@/components/public/PublicPageLayout';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { PublicContentCard, PublicCTA } from '@/components/public/PublicParts';
import { ButtonLink } from '@/components/ui/button';
import { useI18n } from '@/i18n';
import { links, routes } from '@/lib/links';
import { formatPrice, usePricingState } from '@/lib/pricing';
import { cn } from '@/lib/utils';

/** Os valores vêm sempre da API (`/billing/pricing`). Sem API ou sem preços ativos, a página diz-o com clareza. */
export function PricingPage() {
  const { t, locale } = useI18n();
  const { status, data } = usePricingState();
  const [yearly, setYearly] = useState(false);
  const p = t.pricing;

  return (
    <PublicPageLayout title="Planos" description="Os planos do FitGram para treinadores.">
      <PublicPageHero eyebrow="Planos" title={status === 'ready' ? <>{p.headPre}<span className="text-primary">{p.headHl}</span></> : <>Planos para <span className="text-primary">treinadores.</span></>} lead={status === 'ready' ? p.sub : 'Começa no plano gratuito e passa ao Pro quando precisares.'} />

      <section className="py-16 md:py-20">
        <PublicContainer>
          {status === 'loading' && (
            <div className="grid gap-6 md:grid-cols-2" aria-busy="true" aria-label="A carregar planos">
              {[0, 1].map((i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          )}

          {status === 'unavailable' && (
            <PublicContentCard className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight">Os preços ainda não estão nesta página</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Podes criar a conta e começar já no plano gratuito, sem cartão. Para saberes os valores do plano Pro, vê-os na app ou fala connosco.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={links.signup} size="lg">
                  Criar conta grátis
                  <ArrowRight className="size-5" aria-hidden />
                </ButtonLink>
                <ButtonLink href={links.contact} size="lg" variant="outline">
                  <Mail className="size-4" aria-hidden />
                  Contactar
                </ButtonLink>
              </div>
            </PublicContentCard>
          )}

          {status === 'ready' && data && (
            <>
              <div className="flex justify-center">
                <div className="relative inline-grid grid-cols-2 rounded-full border border-border bg-card p-1" role="group" aria-label="Periodicidade">
                  <span
                    aria-hidden
                    className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary transition-transform duration-300 ease-out"
                    style={{ transform: yearly ? 'translateX(100%)' : 'translateX(0)' }}
                  />
                  {([false, true] as const).map((isYearly) => (
                    <button
                      key={String(isYearly)}
                      type="button"
                      aria-pressed={yearly === isYearly}
                      onClick={() => setYearly(isYearly)}
                      className={cn(
                        'relative z-10 min-h-[40px] rounded-full px-6 text-sm font-semibold outline-none transition-colors duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        yearly === isYearly ? 'text-primary-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {isYearly ? p.yearly : p.monthly}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                <PublicContentCard className="flex flex-col">
                  <h2 className="text-xl font-bold">{p.free.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{p.free.tagline}</p>
                  <p className="mt-6 text-4xl font-extrabold text-primary">{formatPrice(0, data.currency, locale)}</p>
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.upTo.replace('{count}', String(data.free.maxTrainees))}</p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {p.free.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={links.signup} variant="outline" size="lg" className="mt-8 w-full">
                    {p.free.cta}
                  </ButtonLink>
                </PublicContentCard>

                <PublicContentCard highlight className="flex flex-col">
                  <h2 className="text-xl font-bold">{data.pro.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{p.pro.tagline}</p>
                  <p className="mt-6 text-4xl font-extrabold text-primary">
                    {formatPrice(yearly ? data.pro.yearlyCents : data.pro.monthlyCents, data.currency, locale)}
                    <span className="ml-1 text-base font-medium text-muted-foreground">{yearly ? p.perYear : p.perMonth}</span>
                  </p>
                  <p className="mt-1 h-5 text-xs font-medium text-success">
                    {yearly && data.pro.monthlyCents * 12 - data.pro.yearlyCents > 0 ? p.save.replace('{amount}', formatPrice(data.pro.monthlyCents * 12 - data.pro.yearlyCents, data.currency, locale)) : ''}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {data.pro.maxTrainees === null ? p.unlimited : p.upTo.replace('{count}', String(data.pro.maxTrainees))}
                  </p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {p.pro.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={links.signup} size="lg" className="mt-8 w-full">
                    {p.pro.cta}
                    <ArrowRight className="size-5" aria-hidden />
                  </ButtonLink>
                </PublicContentCard>
              </div>
            </>
          )}
        </PublicContainer>
      </section>

      <PublicCTA title="Tens perguntas sobre os planos?" body="Vê as respostas mais comuns ou fala diretamente com a equipa." to={routes.faq} label="Perguntas frequentes" secondaryTo={links.contact} secondaryLabel="Contactar" />
    </PublicPageLayout>
  );
}

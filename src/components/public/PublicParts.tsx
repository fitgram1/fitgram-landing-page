import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PublicContainer } from './PublicPageLayout';

export function PublicSectionHeader({ eyebrow, title, lead, align = 'left' }: { eyebrow?: string; title: ReactNode; lead?: string; align?: 'left' | 'center' }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
      <h2 className="mt-3 text-[clamp(26px,3.6vw,38px)] font-extrabold leading-[1.08] tracking-tight">{title}</h2>
      {lead && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  );
}

/** Cartão base — mesmo raio, borda, sombra e elevação em hover em todas as páginas. */
export function PublicContentCard({ className, highlight = false, children }: { className?: string; highlight?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-6 shadow-card transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-pop sm:p-8',
        highlight ? 'border-primary/60' : 'border-border hover:border-foreground/20',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Fecho de página: conduz sempre ao passo seguinte real. */
export function PublicCTA({ title, body, to, label, secondaryTo, secondaryLabel }: { title: string; body: string; to: string; label: string; secondaryTo?: string; secondaryLabel?: string }) {
  return (
    <section className="py-16 md:py-24">
      <PublicContainer>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight tracking-tight">{title}</h2>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={to} size="lg">
                {label}
                <ArrowRight className="size-5" aria-hidden />
              </ButtonLink>
              {secondaryTo && secondaryLabel && (
                <ButtonLink href={secondaryTo} size="lg" variant="outline">
                  {secondaryLabel}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </PublicContainer>
    </section>
  );
}

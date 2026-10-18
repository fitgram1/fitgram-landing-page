import type { ReactNode } from 'react';
import { PublicContainer } from './PublicPageLayout';

/** Linha de pulso — a mesma assinatura visual da história da página inicial. */
function PulseLine() {
  return (
    <svg viewBox="0 0 1280 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-60" aria-hidden>
      <path
        className="pulse-draw"
        pathLength={1}
        d="M0,70 L430,70 L475,52 L495,92 L525,14 L555,112 L580,70 L760,60 L900,44 L1060,12 L1280,0"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="1"
      />
    </svg>
  );
}

interface PublicPageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}

export function PublicPageHero({ eyebrow, title, lead, children }: PublicPageHeroProps) {
  return (
    <section className="relative border-b border-border bg-card/40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,hsl(var(--primary)/0.10),transparent_70%)]"
        aria-hidden
      />
      <PublicContainer className="relative pb-20 pt-14 md:pb-24 md:pt-20">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-8 bg-primary" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-[clamp(34px,5.4vw,60px)] font-extrabold leading-[1.04] tracking-tight">{title}</h1>
        {lead && <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-lg">{lead}</p>}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </PublicContainer>
      <PulseLine />
    </section>
  );
}

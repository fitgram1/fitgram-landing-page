import { cn } from '@/lib/utils';
import { TLink } from '@/lib/nav';
import { useT } from '@/i18n';
import badge from '@/assets/fitgram-treinador-atleta.webp';

/** Logótipo FitGram: leva sempre à página inicial (e ao topo, se já lá estiveres). */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const t = useT();
  return (
    <TLink to="/" aria-label={t.common.homeAria} className={cn('logo-in group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', className)}>
      <img
        src={badge}
        alt=""
        aria-hidden
        className={cn('rounded-full shadow-[0_0_14px_rgba(249,115,22,0.35)] transition-[width,height,transform] duration-300 ease-out group-hover:-rotate-6', compact ? 'size-10' : 'size-12')}
      />
      <span className={cn('font-extrabold tracking-tight text-foreground transition-[font-size] duration-300', compact ? 'text-[19px]' : 'text-xl')}>FitGram</span>
    </TLink>
  );
}

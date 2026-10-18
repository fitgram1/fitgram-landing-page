import { cn } from '@/lib/utils';
import { TLink } from '@/lib/nav';

/** Logótipo FitGram: leva sempre à página inicial (e ao topo, se já lá estiveres). */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <TLink to="/" aria-label="FitGram — página inicial" className={cn('logo-in group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', className)}>
      <span
        className={cn(
          'grid place-items-center rounded-[10px] bg-primary font-extrabold text-primary-foreground transition-[width,height,font-size,transform] duration-300 ease-out group-hover:-rotate-6',
          compact ? 'size-8 text-base' : 'size-9 text-lg',
        )}
      >
        F
      </span>
      <span className={cn('font-extrabold tracking-tight text-foreground transition-[font-size] duration-300', compact ? 'text-[19px]' : 'text-xl')}>FitGram</span>
    </TLink>
  );
}

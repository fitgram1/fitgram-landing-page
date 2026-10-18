import { cn } from '@/lib/utils';
import { TLink } from '@/lib/nav';

/** Logótipo FitGram: leva sempre à página inicial (e ao topo, se já lá estiveres). */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <TLink to="/" aria-label="FitGram — página inicial" className={cn('logo-in group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', className)}>
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt=""
        aria-hidden
        className={cn('rounded-[10px] transition-[width,height,transform] duration-300 ease-out group-hover:-rotate-6', compact ? 'size-8' : 'size-9')}
      />
      <span className={cn('font-extrabold tracking-tight text-foreground transition-[font-size] duration-300', compact ? 'text-[19px]' : 'text-xl')}>FitGram</span>
    </TLink>
  );
}

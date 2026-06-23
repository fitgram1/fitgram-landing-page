import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5 text-xl font-extrabold tracking-tight', className)}>
      <span className="grid size-9 place-items-center rounded-[10px] bg-primary text-lg font-extrabold text-primary-foreground">
        F
      </span>
      FitGram
    </div>
  );
}

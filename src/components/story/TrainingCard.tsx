import { copy } from './copy';
import { Dumbbell2D } from './Dumbbell2D';

/** Cartão de treino (420×230 no espaço de design). Reutilizado no ecrã do treinador e no telemóvel. */
export function TrainingCard({ className = '', showIcon = false }: { className?: string; showIcon?: boolean }) {
  const { exercise, demoTag } = copy;
  return (
    <div
      className={`tc h-[230px] w-[420px] relative rounded-2xl border border-border bg-card p-5 text-foreground shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="tc-icon grid size-14 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10">
          {showIcon && <Dumbbell2D className="w-9" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[20px] font-bold leading-tight">{exercise.name}</p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">{exercise.muscles}</p>
        </div>
      </div>
      <span className="absolute -top-2.5 right-5 rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {demoTag}
      </span>
      <div className="tc-stats mt-6 grid grid-cols-5 gap-2">
        {exercise.stats.map((s) => (
          <div key={s.label} className="tc-stat rounded-xl bg-foreground/[0.04] px-2 py-3 text-center">
            <p className="whitespace-nowrap text-[20px] font-extrabold leading-none text-foreground">{s.value}</p>
            <p className="mt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full w-0 rounded-full bg-primary" />
      </div>
    </div>
  );
}

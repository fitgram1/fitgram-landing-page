import { CheckCircle2 } from "lucide-react";

export function FloatCard({
  icon: Icon,
  iconClass,
  title,
  value,
  className,
  animation,
}: {
  icon: typeof CheckCircle2;
  iconClass: string;
  title: string;
  value: string;
  className: string;
  animation: string;
}) {
  return (
    <div className={`absolute z-20 hidden sm:block ${className}`}>
      <div
        className={`glass-card flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 ${animation}`}
      >
        <span
          className={`grid size-8 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon className="size-4" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-medium text-muted-foreground">
            {title}
          </div>
          <div className="text-sm font-bold text-foreground">{value}</div>
        </div>
      </div>
    </div>
  );
}

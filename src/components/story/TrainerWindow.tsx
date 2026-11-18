import { Dumbbell, MessageSquare, Salad, ClipboardList, Users } from 'lucide-react';
import { useT } from '@/i18n';

const ICONS = [Users, Dumbbell, Salad, ClipboardList, MessageSquare];
const ACTIVE = 1;

/** Janela de dashboard do treinador (640×440). O cartão de treino pousa em .tw-slot. */
export function TrainerWindow() {
  const w = useT().trainerWindow;
  const items = w.menu.map((label, i) => ({ icon: ICONS[i], label, active: i === ACTIVE }));
  return (
    <div className="tw h-[440px] w-[640px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      <div className="flex h-9 items-center gap-1.5 border-b border-border px-4">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-4 text-[11px] text-muted-foreground">{w.title}</span>
      </div>
      <div className="flex h-[404px]">
        <aside className="w-[150px] border-r border-border p-3">
          {items.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] ${
                active ? 'bg-primary/15 font-semibold text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </div>
          ))}
        </aside>
        <div className="relative flex-1 p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-foreground">{w.weekPlan}</p>
            <span className="tw-assign inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-white">
              {w.assign}
            </span>
          </div>
          <div className="tw-slot absolute left-[48px] top-[84px] h-[230px] w-[420px] rounded-2xl border border-dashed border-border" />
        </div>
      </div>
    </div>
  );
}

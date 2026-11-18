import { Check, Play, Salad, Dumbbell as DumbbellIcon } from 'lucide-react';
import { TrainingCard } from './TrainingCard';
import { fmt, useT } from '@/i18n';

/** Moldura do telemóvel (300×616). O ecrã tem 278×594 e três vistas sobrepostas. */
export function Phone({ staticCard = false }: { staticCard?: boolean }) {
  return (
    <div className="ph relative h-[616px] w-[300px] rounded-[46px] bg-neutral-800 p-[11px] shadow-2xl ring-1 ring-white/10">
      <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
      <div className="ph-screen relative h-full w-full overflow-hidden rounded-[36px] bg-neutral-950 text-white">
        <TodayScreen staticCard={staticCard} />
        <LiveScreen />
        <NutritionScreen />
      </div>
    </div>
  );
}

function TodayScreen({ staticCard }: { staticCard: boolean }) {
  const p = useT().phone;
  return (
    <div className="scr-today absolute inset-0 px-[12px] pt-[46px]">
      <p className="px-1 text-[16px] font-bold">{p.today}</p>
      <p className="px-1 text-[11px] text-neutral-500">{p.assigned}</p>
      {/* o cartão aterra aqui (254×138 = 420×230 a 0,6) */}
      <div className="ph-card-slot relative mt-3 h-[138px] w-[254px]">
        <div className={`ph-card ${staticCard ? '' : 'opacity-0'} origin-top-left scale-[0.6]`}>
          <TrainingCard showIcon />
        </div>
      </div>
      {p.nextExercises.map((n) => (
        <div key={n} className="mt-2 flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3">
          <div className="grid size-8 place-items-center rounded-lg bg-white/[0.06]">
            <DumbbellIcon className="size-4 text-neutral-500" aria-hidden />
          </div>
          <p className="text-[12px] text-neutral-400">{n}</p>
        </div>
      ))}
      <div className="ph-start absolute bottom-6 left-3 right-3 flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-[14px] font-bold text-white">
        <Play className="size-4" aria-hidden />
        {p.start}
      </div>
    </div>
  );
}

function LiveScreen() {
  const t = useT();
  const p = t.phone;
  const [before, after] = p.setOf.split('{n}');
  return (
    <div className="scr-live absolute inset-0 px-[14px] pt-[46px] opacity-0">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] font-bold leading-tight">{t.story.exercise.name}</p>
          <p className="text-[11px] text-neutral-500">
            {before}<span className="ws-setno">1</span>{after}
          </p>
        </div>
        <span className="ws-timer rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold tabular-nums">00:00</span>
      </div>
      <div className="mt-4 text-center">
        <p className="text-[56px] font-extrabold leading-none tabular-nums">
          <span className="ws-reps">0</span>
          <span className="text-[22px] font-semibold text-neutral-500"> / 12</span>
        </p>
        <p className="mt-1 text-[12px] text-neutral-400">{p.repetitions} · 24 kg</p>
      </div>
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`ws-row ws-row${n} flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5`}>
            <span className={`ws-check ws-check${n} grid size-6 place-items-center rounded-full border border-white/20`}>
              <Check className="ws-tick size-3.5 text-white opacity-0" aria-hidden />
            </span>
            <p className="text-[12px]">{fmt(p.set, { n })}</p>
            <p className="ml-auto text-[12px] tabular-nums text-neutral-400">24 kg × 12</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/10 px-3 py-2">
        <p className="text-[10px] uppercase tracking-wide text-neutral-500">{p.previous} · {t.common.demoTag.toLowerCase()}</p>
        <p className="mt-0.5 text-[11px] text-neutral-300">22 kg × 12 · 22 kg × 11</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-neutral-500">
          <span>{p.workoutProgress}</span>
          <span className="ws-prog-label">0/3</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="ws-progress h-full w-0 rounded-full bg-primary" />
        </div>
      </div>
      <div className="ws-rest absolute bottom-6 left-3 right-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-center opacity-0">
        <p className="text-[10px] uppercase tracking-wide text-neutral-500">{p.rest}</p>
        <p className="ws-rest-time text-[26px] font-extrabold tabular-nums">01:30</p>
      </div>
      <span className="ws-pulse pointer-events-none absolute left-0 top-0 size-4 rounded-full bg-primary opacity-0 shadow-[0_0_24px_6px_rgba(249,115,22,0.7)]" />
    </div>
  );
}

function NutritionScreen() {
  const t = useT();
  const p = t.phone;
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <div className="scr-nutri absolute inset-0 px-[14px] pt-[46px] opacity-0">
      <p className="text-[16px] font-bold">{p.mealPlan}</p>
      <p className="text-[11px] text-neutral-500">{p.lunch} · {t.common.demoTag.toLowerCase()}</p>
      <div className="relative mx-auto mt-4 size-[150px]">
        <div className="nu-ring-glow pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_40px_12px_rgba(249,115,22,0.55)]" aria-hidden />
        <svg viewBox="0 0 130 130" className="size-full -rotate-90">
          <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
          <circle
            className="nu-ring"
            cx="65"
            cy="65"
            r={R}
            fill="none"
            stroke="#f97316"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            data-c={C}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="nu-kcal text-[28px] font-extrabold leading-none tabular-nums">0</p>
          <p className="text-[10px] text-neutral-500">kcal</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {[
          { k: 'p', label: p.protein, color: '#38bdf8', max: 60 },
          { k: 'c', label: p.carbs, color: '#a3e635', max: 90 },
          { k: 'f', label: p.fat, color: '#fbbf24', max: 30 },
        ].map((m) => (
          <div key={m.k}>
            <div className="flex justify-between text-[11px]">
              <span className="text-neutral-400">{m.label}</span>
              <span className="tabular-nums">
                <span className={`nu-${m.k}`}>0</span> g
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className={`nu-bar-${m.k} h-full w-0 rounded-full`} style={{ background: m.color }} data-max={m.max} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/[0.05] px-3 py-2.5">
        <Salad className="size-4 text-primary" aria-hidden />
        <p className="text-[11px] text-neutral-300">{p.recipes}</p>
      </div>
    </div>
  );
}

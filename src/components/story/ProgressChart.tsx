import { useState } from 'react';
import { demo } from './copy';
import { fmt, useT } from '@/i18n';

const W = 700;
const H = 330;
const PAD = { l: 52, r: 24, t: 28, b: 44 };
const data = demo.load;
const min = 18;
const max = 30;
const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (data.length - 1);
const y = (v: number) => PAD.t + ((max - v) * (H - PAD.t - PAD.b)) / (max - min);
const pts = data.map((v, i) => ({ x: x(i), y: y(v), v, i }));
export const chartPath = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
const area = `${chartPath} L${pts[pts.length - 1].x},${H - PAD.b} L${pts[0].x},${H - PAD.b} Z`;

/** Gráfico interativo (passar o rato / tocar num ponto). Dados de demonstração. 740×430 */
export function ProgressChart({ className = '' }: { className?: string }) {
  const t = useT();
  const c = t.chart;
  const [active, setActive] = useState<number | null>(null);
  const a = active === null ? null : pts[active];
  const best = Math.max(...data);

  return (
    <div className={`pc relative h-[430px] w-[740px] rounded-2xl border border-border bg-card p-5 text-foreground ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] font-bold">{c.title}</p>
          <p className="text-[12px] text-muted-foreground">{t.story.exercise.name} · {c.unit}</p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {t.common.demoData}
        </span>
      </div>
      <div className="relative mt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={c.aria}>
          <defs>
            <linearGradient id="pc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f97316" stopOpacity="0.32" />
              <stop offset="1" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="pc-axes">
            {[20, 22, 24, 26, 28, 30].map((v) => (
              <g key={v}>
                <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="hsl(var(--border))" />
                <text x={PAD.l - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
                  {v}
                </text>
              </g>
            ))}
            {pts.map((p) => (
              <text key={p.i} x={p.x} y={H - 16} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
                {fmt(c.weekShort, { n: p.i + 1 })}
              </text>
            ))}
          </g>
          <path className="pc-area" d={area} fill="url(#pc-fill)" />
          <path
            className="pc-line"
            d={chartPath}
            fill="none"
            stroke="#f97316"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
          />
          {pts.map((p) => (
            <g key={p.i} className="pc-point" style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
              <circle cx={p.x} cy={p.y} r={active === p.i ? 8 : 5.5} fill="hsl(var(--card))" stroke="#f97316" strokeWidth="3" />
              <circle
                cx={p.x}
                cy={p.y}
                r="20"
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onPointerEnter={() => setActive(p.i)}
                onPointerLeave={() => setActive(null)}
                onClick={() => setActive(p.i)}
              />
            </g>
          ))}
          <g className="pc-traveler" opacity="0">
            <rect x="-13" y="-3" width="26" height="6" rx="3" fill="#f97316" />
            <rect x="-17" y="-9" width="6" height="18" rx="2" fill="hsl(var(--foreground))" />
            <rect x="11" y="-9" width="6" height="18" rx="2" fill="hsl(var(--foreground))" />
          </g>
        </svg>
        {a && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 text-[12px]"
            style={{ left: `${(a.x / W) * 100}%`, top: `${(a.y / H) * 100}%` }}
          >
            <span className="font-bold">{fmt(c.week, { n: a.i + 1 })}: {a.v} kg</span>
            {a.v === best && <span className="ml-2 text-primary">{c.personalBest}</span>}
            <span className="block text-[10px] text-muted-foreground">{t.common.demoData}</span>
          </div>
        )}
      </div>
    </div>
  );
}

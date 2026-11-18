import { useT } from '@/i18n';

/** Prato com comida ilustrada: os ingredientes (.ing) entram no prato com o scroll. 320×320 */
/** `shown`: versão vertical, com os ingredientes já no prato. */

/** Peito de frango grelhado, centrado em (0,0). */
function Chicken() {
  return (
    <g>
      <path
        d="M-44 -6 C-46 -26 -26 -36 -4 -34 C20 -32 44 -24 46 -4 C48 16 30 30 4 30 C-22 30 -42 18 -44 -6 Z"
        fill="url(#np-chicken)"
        stroke="#8a4f1c"
        strokeWidth="1.5"
      />
      <g stroke="#6b3a12" strokeWidth="4" strokeLinecap="round" opacity="0.75">
        <line x1="-26" y1="-20" x2="-8" y2="18" />
        <line x1="-8" y1="-26" x2="12" y2="20" />
        <line x1="12" y1="-26" x2="30" y2="12" />
      </g>
      <ellipse cx="-14" cy="-18" rx="14" ry="5" fill="#fff" opacity="0.18" transform="rotate(-12)" />
    </g>
  );
}

/** Arroz: monte branco com grãos. */
function Rice() {
  const grains = [
    [-26, -4, -20], [-14, -14, 25], [-2, -20, -10], [12, -14, 35], [24, -4, -30],
    [-30, 8, 15], [-16, 4, -35], [-2, -6, 10], [12, 2, -15], [28, 8, 20],
    [-20, 16, 30], [-6, 12, -25], [8, 14, 5], [20, 18, -10], [0, 22, 40],
  ];
  return (
    <g>
      <ellipse cx="0" cy="4" rx="44" ry="32" fill="#efe8d6" />
      <ellipse cx="0" cy="0" rx="40" ry="28" fill="#fbf7ec" />
      {grains.map(([x, y, a], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="2.6" fill="#fffdf7" stroke="#ddd3bb" strokeWidth="0.9" transform={`rotate(${a} ${x} ${y})`} />
      ))}
    </g>
  );
}

/** Brócolos e tomate cherry. */
function Greens() {
  return (
    <g>
      <path d="M-6 30 L-3 6 L5 6 L8 30 Q1 34 -6 30 Z" fill="#8cbf4a" stroke="#5f8f2a" strokeWidth="1.2" />
      <path d="M1 14 L-12 2 M3 12 L16 0" stroke="#8cbf4a" strokeWidth="5" strokeLinecap="round" />
      {[
        [-18, -2, 13], [0, -12, 15], [18, -2, 13], [-8, 4, 11], [10, 4, 11],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#2f7a2a" />
          <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.62} fill="#46a03a" />
          <circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.22} fill="#7cc95c" />
        </g>
      ))}
      {[[38, 18], [30, 34]].map(([x, y], i) => (
        <g key={`t${i}`}>
          <circle cx={x} cy={y} r="10" fill="#e5392f" />
          <circle cx={x - 3} cy={y - 3} r="3" fill="#fff" opacity="0.45" />
          <path d={`M${x - 4} ${y - 9} L${x} ${y - 6} L${x + 4} ${y - 9}`} stroke="#3f8a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/** Meio abacate com caroço. */
function Avocado() {
  return (
    <g transform="rotate(-25)">
      <path d="M0 -34 C14 -34 22 -18 24 0 C27 20 16 34 0 34 C-16 34 -27 20 -24 0 C-22 -18 -14 -34 0 -34 Z" fill="#2f5a1d" />
      <path d="M0 -29 C11 -29 18 -15 20 0 C22 17 13 29 0 29 C-13 29 -22 17 -20 0 C-18 -15 -11 -29 0 -29 Z" fill="url(#np-avocado)" />
      <circle cx="0" cy="8" r="11" fill="#7a4a22" />
      <circle cx="-3" cy="4" r="3.5" fill="#fff" opacity="0.25" />
    </g>
  );
}

export function NutritionPlate({ shown = false }: { shown?: boolean }) {
  const pl = useT().story.plate;
  const items = [
    { cls: 'ing-1', x: 112, y: 140, label: pl.chicken, Food: Chicken },
    { cls: 'ing-2', x: 206, y: 122, label: pl.rice, Food: Rice },
    { cls: 'ing-3', x: 186, y: 206, label: pl.greens, Food: Greens },
    { cls: 'ing-4', x: 112, y: 214, label: pl.avocado, Food: Avocado },
  ];
  return (
    <svg viewBox="0 0 320 320" overflow="visible" className="np h-[320px] w-[320px] overflow-visible" role="img" aria-label={pl.aria}>
      <defs>
        <radialGradient id="np-plate" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="hsl(var(--secondary))" />
          <stop offset="1" stopColor="hsl(var(--card))" />
        </radialGradient>
        <linearGradient id="np-chicken" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3a35c" />
          <stop offset="1" stopColor="#b8702f" />
        </linearGradient>
        <radialGradient id="np-avocado" cx="50%" cy="55%" r="60%">
          <stop offset="0" stopColor="#f0f2a6" />
          <stop offset="0.6" stopColor="#cfe27c" />
          <stop offset="1" stopColor="#9cc653" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="165" r="140" fill="url(#np-plate)" stroke="hsl(var(--border))" strokeWidth="2" />
      <circle cx="160" cy="165" r="104" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
      {items.map(({ cls, x, y, label, Food }) => (
        <g key={cls} className={`ing ${cls}`} opacity={shown ? 1 : 0} aria-label={label}>
          <g transform={`translate(${x} ${y})`}>
            <Food />
          </g>
        </g>
      ))}
      {/* Faíscas quando cada alimento aterra (animadas pela história). */}
      {items.map(({ cls, x, y }, i) => (
        <g key={`b-${cls}`} transform={`translate(${x} ${y})`} aria-hidden>
          <g className={`np-burst np-burst-${i + 1}`} opacity="0">
            {Array.from({ length: 8 }, (_, k) => {
              const a = (k / 8) * Math.PI * 2;
              return (
                <line
                  key={k}
                  x1={Math.cos(a) * 40}
                  y1={Math.sin(a) * 40}
                  x2={Math.cos(a) * 54}
                  y2={Math.sin(a) * 54}
                  stroke={k % 2 ? '#fde68a' : '#f97316'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </g>
      ))}
      {/* Vapor a subir do prato. */}
      <g className="np-steam-g" opacity={shown ? 1 : 0} aria-hidden>
        <g className="np-steam" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="6" strokeLinecap="round">
          <path d="M128 112 C116 92 140 76 128 56 C116 36 140 22 128 4" />
          <path d="M162 104 C150 84 174 68 162 48 C150 28 174 14 162 -4" />
          <path d="M196 112 C184 92 208 76 196 56 C184 36 208 22 196 4" />
        </g>
      </g>
    </svg>
  );
}

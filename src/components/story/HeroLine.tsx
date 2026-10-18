/** Sinal laranja: bate como um pulso e acaba num gráfico de desempenho (1280×720). */
export const HERO_PATH =
  'M0,360 L430,360 L455,360 L475,330 L495,392 L525,250 L555,432 L580,360 L690,360 L760,342 L830,306 L900,316 L980,262 L1060,240 L1280,206';

export function HeroLine() {
  return (
    <svg viewBox="0 0 1280 720" className="hl absolute inset-0 h-full w-full" style={{ transform: 'translateY(190px)' }} aria-hidden>
      <defs>
        <filter id="hl-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        className="hl-path"
        d={HERO_PATH}
        fill="none"
        stroke="#f97316"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        filter="url(#hl-glow)"
      />
    </svg>
  );
}

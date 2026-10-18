/** Ponte entre a história (fundo preto) e o resto da página: o sinal laranja esbate-se no fundo do tema. */
export function StoryBridge() {
  return (
    <div aria-hidden className="relative h-44 bg-gradient-to-b from-black to-background">
      <svg viewBox="0 0 1280 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="bridge-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#f97316" stopOpacity="0" />
            <stop offset="0.35" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="0.65" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,88 L480,88 L520,88 L545,66 L565,112 L592,24 L624,152 L650,88 L800,88 L1280,88"
          fill="none"
          stroke="url(#bridge-fade)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

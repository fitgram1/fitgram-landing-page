/** Haltere em SVG: alternativa estática sem WebGL / movimento reduzido / ecrãs pequenos. */
export function Dumbbell2D({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 140" className={className} role="img" aria-label="Haltere">
      <defs>
        <linearGradient id="d2d-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a40" />
          <stop offset="1" stopColor="#141417" />
        </linearGradient>
      </defs>
      <rect x="40" y="64" width="240" height="12" rx="6" fill="#2b2b30" />
      <rect x="112" y="60" width="96" height="20" rx="8" fill="#0f0f12" />
      {[0, 1].map((i) => (
        <g key={i} transform={i ? 'translate(320 0) scale(-1 1)' : undefined}>
          <rect x="62" y="22" width="34" height="96" rx="10" fill="url(#d2d-metal)" />
          <rect x="94" y="32" width="26" height="76" rx="9" fill="url(#d2d-metal)" />
          <rect x="82" y="20" width="4" height="100" rx="2" fill="#f97316" />
          <rect x="30" y="58" width="12" height="24" rx="5" fill="#2b2b30" />
        </g>
      ))}
    </svg>
  );
}

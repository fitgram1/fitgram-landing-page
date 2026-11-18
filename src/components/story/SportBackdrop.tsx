import type { SportScene } from './chapter2Data';

/**
 * Cenário animado de cada modalidade (só decoração, CSS + SVG):
 * pista, água, estrada e HYROX. Os movimentos param com «movimento reduzido».
 */
export function SportBackdrop({ kind, accent }: { kind: SportScene['key']; accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-70">
      {kind === 'run' && <Track accent={accent} />}
      {kind === 'swim' && <Water accent={accent} />}
      {kind === 'bike' && <Road accent={accent} />}
      {kind === 'hyrox' && <Arena />}
      {/* vinheta para o texto ler bem */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_45%,rgba(0,0,0,0.55),transparent_75%)]" />
    </div>
  );
}

/** Pista de atletismo em perspetiva, com as faixas a correr para o espectador. */
function Track({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="trk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c2d12" stopOpacity="0" />
          <stop offset="1" stopColor="#c2410c" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M700 420 L900 420 L1600 900 L0 900 Z" fill="url(#trk)" />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
        <line key={k} x1={800 + k * 28} y1="420" x2={800 + k * 260} y2="900" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
      ))}
      <g className="bd-run-dash" stroke={accent} strokeWidth="6" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((k) => (
          <line key={k} x1="800" y1={460 + k * 90} x2="800" y2={500 + k * 90} />
        ))}
      </g>
      <line x1="0" y1="420" x2="1600" y2="420" stroke={accent} strokeOpacity="0.6" strokeWidth="2" />
    </svg>
  );
}

/** Água: várias camadas de ondas a deslizar e bolhas a subir. */
function Water({ accent }: { accent: string }) {
  const wave = (y: number, a: number) => `M0 ${y} Q 100 ${y - a} 200 ${y} T 400 ${y} T 600 ${y} T 800 ${y} T 1000 ${y} T 1200 ${y} T 1400 ${y} T 1600 ${y} T 1800 ${y} T 2000 ${y} T 2200 ${y} T 2400 ${y} T 2600 ${y} T 2800 ${y} T 3000 ${y} T 3200 ${y} V 900 H 0 Z`;
  return (
    <>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g className="bd-wave bd-wave-1">
          <path d={wave(470, 30)} fill={accent} fillOpacity="0.12" />
        </g>
        <g className="bd-wave bd-wave-2">
          <path d={wave(560, 40)} fill={accent} fillOpacity="0.16" />
        </g>
        <g className="bd-wave bd-wave-3">
          <path d={wave(660, 26)} fill="#0ea5e9" fillOpacity="0.22" />
        </g>
        {/* cordas das pistas */}
        {[720, 800, 880].map((y) => (
          <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke="#fde047" strokeOpacity="0.5" strokeWidth="4" strokeDasharray="14 10" />
        ))}
      </svg>
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="bd-bubble absolute rounded-full border border-white/40"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: '-20px',
            width: 6 + (i % 4) * 5,
            height: 6 + (i % 4) * 5,
            animationDelay: `${-(i * 0.7)}s`,
            animationDuration: `${5 + (i % 5)}s`,
          }}
        />
      ))}
    </>
  );
}

/** Estrada em perspetiva com o traço central a passar. */
function Road({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      <path d="M760 380 L840 380 L1300 900 L300 900 Z" fill="#111" fillOpacity="0.85" />
      <path d="M760 380 L300 900" stroke={accent} strokeOpacity="0.6" strokeWidth="4" />
      <path d="M840 380 L1300 900" stroke={accent} strokeOpacity="0.6" strokeWidth="4" />
      <g className="bd-road-dash" fill="#fff" fillOpacity="0.8">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={796 - k * 3} y={400 + k * 85} width={8 + k * 6} height={30 + k * 12} />
        ))}
      </g>
      <g stroke={accent} strokeOpacity="0.25" strokeWidth="2">
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <line key={k} x1="800" y1="380" x2={k * 270 - 10} y2="0" />
        ))}
      </g>
    </svg>
  );
}

/** HYROX: grelha de pavilhão discreta. */
function Arena() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />
    </>
  );
}

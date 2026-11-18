import type { ReactNode } from 'react';
import type { SportScene } from './chapter2Data';

/**
 * O atleta e a atleta do emblema FitGram em pictograma, a praticar cada modalidade.
 * Cada figura alterna entre duas poses (animação SVG); ele a branco, ela a laranja com rabo-de-cavalo.
 */

type P = [number, number];
interface Pose {
  head: P;
  neck: P;
  hip: P;
  lElbow: P;
  lHand: P;
  rElbow: P;
  rHand: P;
  lKnee: P;
  lFoot: P;
  rKnee: P;
  rFoot: P;
}

const MAN = '#f4f4f5';
const WOMAN = '#f97316';

const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Segmento que anima entre a pose A e a pose B (ida e volta). */
function Seg({ a1, a2, b1, b2, w, color, dur, begin }: { a1: P; a2: P; b1: P; b2: P; w: number; color: string; dur: number; begin: number }) {
  const anim = (attr: string, va: number, vb: number) =>
    reduced ? null : <animate attributeName={attr} values={`${va};${vb};${va}`} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />;
  return (
    <line x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} stroke={color} strokeWidth={w} strokeLinecap="round">
      {anim('x1', a1[0], b1[0])}
      {anim('y1', a1[1], b1[1])}
      {anim('x2', a2[0], b2[0])}
      {anim('y2', a2[1], b2[1])}
    </line>
  );
}

function Figure({ a, b, color, woman = false, dur = 0.8, begin = 0 }: { a: Pose; b: Pose; color: string; woman?: boolean; dur?: number; begin?: number }) {
  const S = (k1: keyof Pose, k2: keyof Pose, w = 12) => <Seg a1={a[k1]} a2={a[k2]} b1={b[k1]} b2={b[k2]} w={w} color={color} dur={dur} begin={begin} />;
  const head = (axis: 0 | 1) => (reduced ? null : <animate attributeName={axis ? 'cy' : 'cx'} values={`${a.head[axis]};${b.head[axis]};${a.head[axis]}`} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />);
  return (
    <g>
      {/* braço e perna de trás um pouco mais escuros, para dar profundidade */}
      <g opacity="0.55">
        {S('neck', 'rElbow')}
        {S('rElbow', 'rHand')}
        {S('hip', 'rKnee', 13)}
        {S('rKnee', 'rFoot', 13)}
      </g>
      {S('neck', 'hip', 16)}
      {S('hip', 'lKnee', 13)}
      {S('lKnee', 'lFoot', 13)}
      {S('neck', 'lElbow')}
      {S('lElbow', 'lHand')}
      <circle cx={a.head[0]} cy={a.head[1]} r="12" fill={color}>
        {head(0)}
        {head(1)}
      </circle>
      {woman && (
        <g>
          {/* rabo-de-cavalo: acompanha a cabeça */}
          <path d={`M${a.head[0] - 8} ${a.head[1] - 6} q -16 2 -20 18`} stroke={color} strokeWidth="7" strokeLinecap="round" fill="none">
            {!reduced && (
              <animateTransform attributeName="transform" type="translate" values={`0 0;${b.head[0] - a.head[0]} ${b.head[1] - a.head[1]};0 0`} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
            )}
          </path>
        </g>
      )}
    </g>
  );
}

/** Desloca uma pose (para pôr a segunda figura ao lado / noutra pista). */
const shift = (p: Pose, dx: number, dy: number): Pose =>
  Object.fromEntries(Object.entries(p).map(([k, v]) => [k, [v[0] + dx, v[1] + dy]])) as unknown as Pose;
/** Troca braços e pernas (passada seguinte). */
const swap = (p: Pose): Pose => ({ ...p, lElbow: p.rElbow, lHand: p.rHand, rElbow: p.lElbow, rHand: p.lHand, lKnee: p.rKnee, lFoot: p.rFoot, rKnee: p.lKnee, rFoot: p.lFoot });

// ---------- poses ----------
const RUN: Pose = {
  head: [104, 34], neck: [100, 52], hip: [94, 104],
  lElbow: [120, 72], lHand: [134, 56], rElbow: [78, 76], rHand: [86, 96],
  lKnee: [118, 136], lFoot: [110, 176], rKnee: [78, 134], rFoot: [56, 152],
};
const RUN_B: Pose = { ...swap(RUN), head: [104, 30], neck: [100, 48], hip: [94, 100] };

const SWIM: Pose = {
  head: [158, 96], neck: [142, 100], hip: [80, 106],
  lElbow: [170, 78], lHand: [192, 92], rElbow: [114, 124], rHand: [96, 134],
  lKnee: [54, 102], lFoot: [28, 98], rKnee: [54, 112], rFoot: [28, 120],
};
const SWIM_B: Pose = { ...SWIM, lElbow: [114, 124], lHand: [96, 134], rElbow: [170, 78], rHand: [192, 92], lKnee: [54, 112], lFoot: [28, 120], rKnee: [54, 102], rFoot: [28, 98] };

const BIKE: Pose = {
  head: [140, 50], neck: [126, 64], hip: [82, 92],
  lElbow: [146, 84], lHand: [158, 98], rElbow: [142, 86], rHand: [154, 100],
  lKnee: [114, 112], lFoot: [116, 148], rKnee: [96, 128], rFoot: [74, 134],
};
const BIKE_B: Pose = { ...BIKE, lKnee: [96, 128], lFoot: [74, 134], rKnee: [114, 112], rFoot: [116, 148] };

const SLED: Pose = {
  head: [140, 66], neck: [126, 78], hip: [84, 104],
  lElbow: [150, 92], lHand: [166, 96], rElbow: [146, 96], rHand: [164, 100],
  lKnee: [104, 140], lFoot: [96, 176], rKnee: [70, 134], rFoot: [42, 168],
};
const SLED_B: Pose = { ...SLED, head: [142, 68], lKnee: [70, 134], lFoot: [42, 168], rKnee: [104, 140], rFoot: [96, 176] };

/**
 * Ilustrações do atleta e da atleta do emblema a praticar cada modalidade.
 * Basta pôr em `src/assets/athletes/` um ficheiro com o nome da modalidade
 * (run, swim, bike, hyrox — .webp ou .png); enquanto não existir, usa-se o pictograma.
 */
const ILLUSTRATIONS = import.meta.glob<string>('../../assets/athletes/*.{webp,png}', { eager: true, import: 'default' });
const illustration = (kind: SportScene['key']) =>
  ILLUSTRATIONS[`../../assets/athletes/${kind}.webp`] ?? ILLUSTRATIONS[`../../assets/athletes/${kind}.png`];
/** Vídeo em loop (ex.: gerado a partir da ilustração): tem prioridade sobre a imagem. */
const CLIPS = import.meta.glob<string>('../../assets/athletes/*.{mp4,webm}', { eager: true, import: 'default' });
const clip = (kind: SportScene['key']) => CLIPS[`../../assets/athletes/${kind}.webm`] ?? CLIPS[`../../assets/athletes/${kind}.mp4`];

/** Cena com as duas figuras na modalidade dada. viewBox 0 0 240 240. */
export function SportAthletes({ kind, accent }: { kind: SportScene['key']; accent: string }) {
  const video = clip(kind);
  if (video) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <video src={video} poster={illustration(kind)} className="h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden />
      </div>
    );
  }
  const img = illustration(kind);
  if (img) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <img src={img} alt="" className={`ath-img ath-${kind} h-full w-full select-none object-cover`} draggable={false} />
        {/* linhas de velocidade a passar */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[18, 34, 52, 70, 84].map((top, i) => (
            <span
              key={top}
              className="ath-speed absolute h-[3px] rounded-full"
              style={{ top: `${top}%`, width: `${18 + (i % 3) * 10}%`, background: `linear-gradient(90deg, transparent, ${accent}cc)`, animationDelay: `${-i * 0.23}s`, animationDuration: kind === 'hyrox' ? '1.6s' : '0.9s' }}
            />
          ))}
        </div>
      </div>
    );
  }
  let body: ReactNode = null;
  switch (kind) {
    case 'run':
      body = (
        <>
          <line x1="10" y1="200" x2="230" y2="200" stroke={accent} strokeOpacity="0.4" strokeWidth="3" />
          <g transform="translate(-4 20) scale(0.9)">
            <Figure a={RUN} b={RUN_B} color={WOMAN} woman dur={0.7} begin={-0.35} />
          </g>
          <g transform="translate(60 22)">
            <Figure a={RUN} b={RUN_B} color={MAN} dur={0.7} />
          </g>
        </>
      );
      break;
    case 'swim':
      body = (
        <>
          <g transform="translate(10 -40)">
            <Figure a={SWIM} b={SWIM_B} color={WOMAN} woman dur={1.1} begin={-0.5} />
          </g>
          <path d="M0 78 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.7" />
          <g transform="translate(20 50)">
            <Figure a={shift(SWIM, 0, 0)} b={SWIM_B} color={MAN} dur={1.1} />
          </g>
          <path d="M0 168 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.7" />
        </>
      );
      break;
    case 'bike': {
      const Bike = ({ x, y, color }: { x: number; y: number; color: string }) => (
        <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="46" cy="150" r="30" />
          <circle cx="166" cy="150" r="30" />
          <path d="M46 150 L 96 140 L 82 92 M96 140 L150 96 L166 150 M82 92 L150 96 M150 96 L154 86" />
        </g>
      );
      body = (
        <>
          <g transform="translate(-6 -10) scale(0.62)">
            <Bike x={0} y={0} color={accent} />
            <Figure a={BIKE} b={BIKE_B} color={WOMAN} woman dur={0.6} begin={-0.3} />
          </g>
          <g transform="translate(96 70) scale(0.62)">
            <Bike x={0} y={0} color={accent} />
            <Figure a={BIKE} b={BIKE_B} color={MAN} dur={0.6} />
          </g>
        </>
      );
      break;
    }
    case 'hyrox':
      body = (
        <>
          <line x1="6" y1="204" x2="234" y2="204" stroke={accent} strokeOpacity="0.5" strokeWidth="3" />
          <g transform="translate(-14 107) scale(0.55)">
            <Figure a={SLED} b={SLED_B} color={WOMAN} woman dur={0.9} begin={-0.45} />
            <rect x="168" y="70" width="58" height="66" rx="6" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="5" />
            <line x1="160" y1="176" x2="236" y2="176" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="translate(64 60) scale(0.8)">
            <Figure a={SLED} b={SLED_B} color={MAN} dur={0.9} />
            <rect x="168" y="70" width="58" height="66" rx="6" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="5" />
            <line x1="160" y1="176" x2="236" y2="176" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          </g>
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" aria-hidden>
      {body}
    </svg>
  );
}

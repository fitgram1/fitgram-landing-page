/**
 * Âncoras da história cinematográfica. As secções fixas (sticky) têm 560–820 vh de altura:
 * cada âncora é uma fração do scroll desse bloco (a mesma escala da linha temporal GSAP).
 * Em ecrãs pequenos / movimento reduzido existe a versão vertical, com ids próprios.
 */
interface Anchor {
  id: string;
  p: number;
  stacked: string;
}

export const ANCHORS: Record<string, Anchor> = {
  explorar: { id: 'top', p: 0.1, stacked: 'sec-movimento' },
  treinadores: { id: 'top', p: 0.42, stacked: 'sec-treinador' },
  atletas: { id: 'top', p: 0.6, stacked: 'sec-treinador' },
  nutricao: { id: 'top', p: 0.78, stacked: 'sec-nutricao' },
  progresso: { id: 'top', p: 0.95, stacked: 'sec-progresso' },
  formatos: { id: 'formatos', p: 0.04, stacked: 'formatos' },
  modalidades: { id: 'formatos', p: 0.4, stacked: 'sec-modalidades' },
  ecossistema: { id: 'formatos', p: 0.66, stacked: 'sec-ecossistema' },
  beta: { id: 'offer', p: 0, stacked: 'offer' },
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Devolve o scrollY de uma âncora, ou null se o elemento ainda não existe. */
export function anchorY(key: string): number | null {
  const a = ANCHORS[key];
  const compact = window.matchMedia('(max-width: 899px)').matches || reduced();
  const el = document.getElementById(compact ? a?.stacked ?? key : a?.id ?? key);
  if (!el) return null;
  const top = el.getBoundingClientRect().top + window.scrollY;
  if (!a || compact || a.p === 0) return Math.max(0, top - 64);
  return top + a.p * Math.max(0, el.offsetHeight - window.innerHeight);
}

export function scrollToAnchor(key: string, smooth = true): boolean {
  const y = anchorY(key);
  if (y === null) return false;
  window.scrollTo({ top: y, behavior: smooth && !reduced() ? 'smooth' : 'auto' });
  return true;
}

import { useEffect, useState } from 'react';

function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' || !window.matchMedia ? initial : window.matchMedia(query).matches,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
/** Abaixo de 900 px (ou ecrã tátil estreito) a história passa a vertical, sem secções fixas. */
export const useIsCompact = () => useMedia('(max-width: 899px)');

export function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setOk(!!(c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/sections/Footer';
import { ANCHORS, scrollToAnchor } from '@/lib/anchors';

const positions = new Map<string, number>();

/**
 * Posição de scroll coerente com o histórico:
 *  - voltar/avançar → repõe a posição guardada;
 *  - ligação com #âncora → vai à cena/secção certa;
 *  - restantes navegações → topo.
 */
function ScrollManager() {
  const loc = useLocation();
  const type = useNavigationType();
  const keyRef = useRef(loc.key);
  keyRef.current = loc.key;

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    let raf = 0;
    const save = () => {
      raf = 0;
      positions.set(keyRef.current, window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(save);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const hash = loc.hash.slice(1);
    let tries = 0;
    let raf = 0;
    const apply = () => {
      if (hash) {
        const ok = hash in ANCHORS ? scrollToAnchor(hash, false) : !!document.getElementById(hash) && (document.getElementById(hash)!.scrollIntoView(), true);
        if (!ok && tries++ < 30) raf = requestAnimationFrame(apply);
        return;
      }
      if (type === 'POP' && positions.has(loc.key)) window.scrollTo(0, positions.get(loc.key)!);
      else window.scrollTo(0, 0);
    };
    apply();
    // As cenas fixas só têm altura definitiva depois do 1.º layout/fontes: confirma uma vez.
    const t = hash ? window.setTimeout(() => scrollToAnchor(hash in ANCHORS ? hash : '', false) || undefined, 350) : 0;
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [loc.key, loc.hash, type]);

  return null;
}

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <ScrollManager />
      <Outlet />
      <Footer />
    </>
  );
}

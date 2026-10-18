import { useEffect, useRef } from 'react';

/** Linha fina laranja que enche com o scroll; vive na base do cabeçalho. */
export function ScrollProgress({ visible }: { visible: boolean }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      role="presentation"
      aria-hidden
    >
      <div ref={bar} className="h-full origin-left bg-primary" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

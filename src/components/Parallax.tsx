import { useEffect, useRef, type ReactNode } from 'react';

/** Move o conteúdo na vertical em relação ao scroll (speed > 0 sobe mais devagar). */
export function Parallax({ children, speed = 0.15, className }: { children?: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.parentElement?.getBoundingClientRect();
      if (!r) return;
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}

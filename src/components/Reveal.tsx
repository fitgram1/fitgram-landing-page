import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms, applied once the element enters the viewport. */
  delay?: number;
  className?: string;
  /** Direction the element enters from. */
  from?: 'up' | 'left' | 'right' | 'scale';
}

const HIDDEN = {
  up: 'translate-y-8 opacity-0 blur-[6px]',
  left: '-translate-x-10 opacity-0 blur-[6px]',
  right: 'translate-x-10 opacity-0 blur-[6px]',
  scale: 'scale-[0.94] translate-y-6 opacity-0 blur-[6px]',
} as const;

export function Reveal({ children, delay = 0, className, from = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    // Replay the entrance every time the element enters the viewport: reveal on
    // intersect, reset to hidden when it leaves so it animates again on return.
    const io = new IntersectionObserver(
      (entries) => {
        setShown(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none',
        shown ? 'translate-x-0 translate-y-0 scale-100 opacity-100 blur-0' : HIDDEN[from],
        className,
      )}
    >
      {children}
    </div>
  );
}

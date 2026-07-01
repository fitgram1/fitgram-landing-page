import * as React from 'react';
import { Text } from 'react-native';

interface CountUpProps {
  end: number;
  durationMs?: number;
  className?: string;
  /** Rendered after the number, e.g. "+". */
  suffix?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 → `end` once the element scrolls into view.
 * Dependency-free; honours prefers-reduced-motion by snapping to the final value.
 */
export function CountUp({ end, durationMs = 1600, className, suffix = '' }: CountUpProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [value, setValue] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(end);
      return;
    }

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        setValue(Math.round(easeOutCubic(p) * end));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, durationMs]);

  return (
    <Text ref={ref} className={className}>
      {value}
      {suffix}
    </Text>
  );
}

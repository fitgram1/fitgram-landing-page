import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarouselProps {
  /** One node per slide. */
  slides: React.ReactNode[];
  /** Autoplay interval in ms. Set 0 to disable autoplay. Default 5000. */
  intervalMs?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Reusable, dependency-free carousel.
 * Autoplay (pauses on hover/focus), prev/next arrows, dots, keyboard arrows,
 * touch/pointer swipe, and respects prefers-reduced-motion.
 */
export function Carousel({ slides, intervalMs = 5000, className, ariaLabel }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = slides.length;

  const reduceMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const go = React.useCallback((next: number) => setIndex((next + count) % count), [count]);

  // Autoplay
  React.useEffect(() => {
    if (paused || reduceMotion || intervalMs <= 0 || count <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, intervalMs, count]);

  // Swipe
  const dragX = React.useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => (dragX.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (delta > 40) go(index - 1);
    else if (delta < -40) go(index + 1);
  };

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div
        className="overflow-hidden rounded-lg"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full px-1"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="absolute -left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-foreground shadow-md outline-none transition-transform hover:scale-105 hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 md:-left-5"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="absolute -right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-foreground shadow-md outline-none transition-transform hover:scale-105 hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 md:-right-5"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-7 flex justify-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  'h-2.5 rounded-full outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  i === index ? 'w-7 bg-primary' : 'w-2.5 bg-border hover:bg-muted-foreground/40',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

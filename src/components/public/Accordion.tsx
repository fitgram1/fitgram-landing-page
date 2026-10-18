import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * Acordeão acessível: botões com aria-expanded/aria-controls, regiões com aria-labelledby,
 * setas ↑ ↓ Home End entre perguntas. A altura anima via grid-template-rows (nunca há altura fixa).
 */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId().replace(/:/g, '');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const to = e.key === 'ArrowDown' ? (i === last ? 0 : i + 1) : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (to === null) return;
    e.preventDefault();
    refs.current[to]?.focus();
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const bid = `${base}-b-${i}`;
        const pid = `${base}-p-${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              'rounded-2xl border bg-card shadow-card transition-[border-color,box-shadow] duration-300 ease-out',
              isOpen ? 'border-primary/60 shadow-pop' : 'border-border hover:border-foreground/20',
            )}
          >
            <h3>
              <button
                ref={(el) => {
                  refs.current[i] = el;
                }}
                id={bid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKey(e, i)}
                className="flex w-full items-center gap-4 rounded-2xl px-5 py-5 text-left outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-6"
              >
                <span className={cn('text-sm font-bold tabular-nums transition-colors', isOpen ? 'text-primary' : 'text-muted-foreground')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={cn('flex-1 text-[17px] font-semibold leading-snug transition-colors duration-200', isOpen && 'text-primary')}>{item.q}</span>
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300',
                    isOpen ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary text-muted-foreground',
                  )}
                >
                  {/* O "+" roda e a barra vertical recolhe: fica "−" */}
                  <span className="relative block size-4" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rounded bg-current" />
                    <span
                      className={cn(
                        'absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rounded bg-current transition-transform duration-300 ease-out',
                        isOpen ? 'rotate-0' : 'rotate-90',
                      )}
                    />
                  </span>
                </span>
              </button>
            </h3>
            <div
              id={pid}
              role="region"
              aria-labelledby={bid}
              className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pl-[3.75rem] pr-6 text-[15px] leading-relaxed text-muted-foreground sm:pl-[4.25rem]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

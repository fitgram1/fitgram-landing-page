import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 px-4 py-1.5 rounded-md text-sm">{t.faq.eyebrow}</Badge>
            <h2 className="text-[clamp(28px,4.4vw,46px)] font-extrabold tracking-tight">
              {t.faq.heading}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border bg-card transition-colors duration-200',
                  isOpen ? 'border-primary/60 shadow-md shadow-primary/5' : 'border-border',
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-semibold outline-none transition-colors hover:text-primary focus-visible:text-primary"
                >
                  {item.q}
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300',
                      isOpen ? 'rotate-180 bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    <ChevronDown className="size-4" strokeWidth={2.5} />
                  </span>
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

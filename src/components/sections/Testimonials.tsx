import * as React from 'react';
import { Quote } from 'lucide-react';
import { Carousel } from '@/components/ui/carousel';
import { useI18n } from '@/i18n';

const WAITLIST_TARGET = 87;

function Counter({ target, label }: { target: number; label: string }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          let cur = 0;
          const step = Math.max(1, Math.round(target / 40));
          const id = window.setInterval(() => {
            cur += step;
            if (cur >= target) {
              cur = target;
              window.clearInterval(id);
            }
            setN(cur);
          }, 25);
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-primary">{n}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Testimonials() {
  const { t } = useI18n();

  const slides = t.testimonials.items.map((item) => (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
      <Quote className="mb-5 size-9 text-primary" />
      <blockquote className="text-[clamp(20px,2.6vw,28px)] font-semibold leading-snug tracking-tight">
        {item.quote}
      </blockquote>
      <div className="mt-6 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{item.name}</span> · {item.role}
      </div>
    </div>
  ));

  return (
    <section className="bg-secondary/40 py-20 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block text-[13px] font-bold uppercase tracking-wide text-primary">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">
            {t.testimonials.heading}
          </h2>
        </div>

        <Carousel
          slides={slides}
          ariaLabel={t.testimonials.eyebrow}
          className="mx-auto max-w-3xl"
        />

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          <Counter target={WAITLIST_TARGET} label={t.testimonials.counterLabel} />
          <p className="text-base font-medium text-muted-foreground">{t.testimonials.builtBy}</p>
        </div>
      </div>
    </section>
  );
}

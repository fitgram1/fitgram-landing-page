import * as React from 'react';
import { View, Text } from 'react-native';
import { Quote } from 'lucide-react';
import { Carousel } from '@/components/ui/carousel';
import { Reveal } from '@/components/Reveal';
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
    <View ref={ref} className="text-center">
      <Text className="text-4xl font-extrabold text-primary">{n}</Text>
      <Text className="text-sm text-muted-foreground">{label}</Text>
    </View>
  );
}

export function Testimonials() {
  const { t } = useI18n();

  const slides = t.testimonials.items.map((item) => (
    <View className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
      <Quote className="mb-5 size-9 text-primary" />
      <blockquote className="text-[clamp(20px,2.6vw,28px)] font-semibold leading-snug tracking-tight">
        {item.quote}
      </blockquote>
      <Text className="mt-6 block text-sm text-muted-foreground">
        <Text className="font-semibold text-foreground">{item.name}</Text> · {item.role}
      </Text>
    </View>
  ));

  return (
    <section className="bg-secondary/40 py-20 md:py-24">
      <View className="container">
        <Reveal>
          <View className="mx-auto mb-12 max-w-2xl text-center">
            <Text className="mb-4 inline-block text-[13px] font-bold uppercase tracking-wide text-primary">
              {t.testimonials.eyebrow}
            </Text>
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">
              {t.testimonials.heading}
            </h2>
          </View>
        </Reveal>

        <Carousel
          slides={slides}
          ariaLabel={t.testimonials.eyebrow}
          className="mx-auto max-w-3xl"
        />

        <View className="mt-16 flex flex-row flex-wrap items-center justify-center gap-x-16 gap-y-6">
          <Counter target={WAITLIST_TARGET} label={t.testimonials.counterLabel} />
          <p className="text-base font-medium text-muted-foreground">{t.testimonials.builtBy}</p>
        </View>
      </View>
    </section>
  );
}

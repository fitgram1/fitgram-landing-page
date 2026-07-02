import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';
import { ClientPanel } from '../subsections/ClientPanel';
import { PlanPanel } from '../subsections/PlanPanel';

const VISUALS = [
  <ClientPanel />,
  <PlanPanel plan="workout" />,
  <PlanPanel plan="diet" />,
  <PlanPanel plan="forms" />,
];

export function Showcase() {
  const { t } = useI18n();

  return (
    <section id="showcase" className="relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-secondary/40 dark:bg-card/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(25_95%_50%/0.06),transparent_60%)]"
        aria-hidden
      />
      <View className="container">
        <View className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 self-center rounded-md px-4 py-1.5 text-sm">{t.showcase.eyebrow}</Badge>
          <h2 className="text-[clamp(28px,4.4vw,46px)] font-extrabold tracking-tight">
            {t.showcase.heading}
          </h2>
        </View>

        <View className="relative mx-auto mt-12 max-w-5xl">
          {/* vertical timeline spine */}
          <div
            className="pointer-events-none absolute left-1/2 top-4 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
            style={{ bottom: '1rem' }}
            aria-hidden
          />

          {t.showcase.items.map((item, i) => (
            <Reveal key={item.title}>
              <View className="relative grid items-center gap-8 py-4 md:grid-cols-2 md:gap-16 md:py-6">
                {/* node on the spine */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] md:block"
                  aria-hidden
                />

                <View className={cn('order-1 md:pr-4', i % 2 === 1 && 'md:order-2 md:pl-4 md:pr-0')}>
                  <h3 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </View>
                <View
                  className={cn(
                    'order-2 flex items-center justify-center md:pl-4',
                    i % 2 === 1 && 'md:order-1 md:pr-4 md:pl-0',
                  )}
                >
                  <div className="origin-center scale-[0.78]">{VISUALS[i]}</div>
                </View>
              </View>
            </Reveal>
          ))}
        </View>
      </View>
    </section>
  );
}

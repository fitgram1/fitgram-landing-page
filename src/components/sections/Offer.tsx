import * as React from 'react';
import { View } from 'react-native';
import { Rocket, MessageCircle, Star, Gift, Tag, Users, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';

const PERK_ICONS = [Rocket, MessageCircle, Star, Gift, Tag];

export function Offer() {
  const { t } = useI18n();
  const perks = t.offer.perks;

  const gridRef = React.useRef<HTMLDivElement>(null);
  const perkRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [tick, setTick] = React.useState(0);
  const [dotTop, setDotTop] = React.useState<number | null>(null);

  // Ping-pong through the perks so the marker travels up and down the spine.
  const n = perks.length;
  const period = Math.max(1, 2 * (n - 1));
  const m = tick % period;
  const active = m < n ? m : period - m;

  React.useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 1400);
    return () => window.clearInterval(id);
  }, []);

  // Place the marker at the vertical centre of the active perk.
  React.useLayoutEffect(() => {
    const grid = gridRef.current;
    const el = perkRefs.current[active];
    if (!grid || !el) return;
    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setDotTop(r.top - g.top + r.height / 2);
  }, [active]);

  return (
    <section id="offer" className="py-20 md:py-24">
      <View className="container">
        <View className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/[0.07] via-card to-card p-8 shadow-xl sm:p-12">
          <div ref={gridRef} className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* vertical divider between columns */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block"
              aria-hidden
            />
            {/* travelling marker */}
            <div
              className="absolute left-1/2 z-10 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] transition-[top] duration-700 ease-in-out lg:block"
              style={{ top: dotTop ?? '50%' }}
              aria-hidden
            />

            {/* Left — pitch */}
            <View className="lg:pr-6">
              <Reveal>
                <Badge className="mb-5 self-start rounded-md px-4 py-1.5 text-sm">
                  {t.offer.eyebrow}
                </Badge>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.05] tracking-tight">
                  {t.offer.headPre}
                  <span className="text-primary">{t.offer.headHl}</span>
                </h2>
              </Reveal>
              <View className="mt-5 h-1 w-12 rounded-full bg-primary" />
              <Reveal delay={200}>
                <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-muted-foreground">
                  {t.offer.lead}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <View className="mt-8 flex flex-row items-center gap-4 rounded-2xl border border-border bg-card/60 p-5">
                  <View className="grid size-12 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <Users className="size-5" />
                  </View>
                  <View className="min-w-0 flex-1">
                    <h3 className="text-base font-bold tracking-tight">{t.offer.highlight.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.offer.highlight.body}
                    </p>
                  </View>
                </View>
              </Reveal>
            </View>

            {/* Right — perks list */}
            <View className="lg:pl-6">
              {perks.map((perk, i) => {
                const Icon = PERK_ICONS[i];
                const isActive = i === active;
                return (
                  <Reveal key={perk.title} delay={i * 80}>
                    <div ref={(el) => { perkRefs.current[i] = el; }}>
                      <View
                        className={cn(
                          'group flex flex-row items-center gap-5 py-5',
                          i > 0 && 'border-t border-border/70',
                        )}
                      >
                        <View
                          className={cn(
                            'grid size-14 shrink-0 place-items-center rounded-full border text-primary transition-colors',
                            isActive
                              ? 'border-primary/50 bg-primary/10'
                              : 'border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/10',
                          )}
                        >
                          <Icon className="size-6" />
                        </View>
                        <View className="min-w-0 flex-1">
                          <h3
                            className={cn(
                              'text-lg font-bold tracking-tight transition-colors group-hover:text-primary',
                              isActive && 'text-primary',
                            )}
                          >
                            {perk.title}
                          </h3>
                          <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">
                            {perk.body}
                          </p>
                        </View>
                      </View>
                    </div>
                  </Reveal>
                );
              })}
            </View>
          </div>


          <View className="mt-10 flex items-center justify-center">
            <ButtonLink
              href="#waitlist"
              size="pill"
              className="cta-shine rounded-md"
            >
              {t.offer.cta}
              <ArrowRight className="size-5" aria-hidden />
            </ButtonLink>
          </View>
        </View>
      </View>
    </section>
  );
}

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n';

function MiniCard({
  dot,
  title,
  sub,
  right,
  rightOk,
}: {
  dot: string;
  title: string;
  sub: string;
  right: string;
  rightOk?: boolean;
}) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm last:mb-0">
      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <span
        className={cn(
          'ml-auto rounded-full px-2.5 py-1 text-xs font-bold',
          rightOk ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary',
        )}
      >
        {right}
      </span>
    </div>
  );
}

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'mb-2.5 max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
        me
          ? 'ml-auto rounded-br-sm bg-primary text-primary-foreground'
          : 'rounded-bl-sm border border-border bg-card',
      )}
    >
      {children}
    </div>
  );
}

const VISUALS = [
  <>
    <MiniCard dot="#F97316" title="João Marques" sub="Hypertrophy · Week 6" right="Check-in" />
    <MiniCard dot="#10b981" title="Ana Ribeiro" sub="Fat loss · Week 3" right="On track" rightOk />
    <MiniCard dot="#8b5cf6" title="Pedro Costa" sub="Strength · Week 9" right="New goal" />
  </>,
  <>
    <MiniCard dot="#F97316" title="Upper Body — Push" sub="5 exercises · 45 min" right="Assigned ✓" />
    <MiniCard dot="#0ea5e9" title="Cutting Diet — 2,100 kcal" sub="P 180g · C 190g · F 60g" right="Sent ✓" />
    <MiniCard dot="#10b981" title="Full Body Template" sub="Reusable · 8 clients" right="Saved" rightOk />
  </>,
  <>
    <Bubble>Coach, should I increase the squat weight this week? 🏋️</Bubble>
    <Bubble me>Yes — add 2.5kg. Your form looked solid on the video. 💪</Bubble>
    <Bubble>Got it, thank you! Logging it now.</Bubble>
  </>,
];

export function Solution() {
  const { t } = useI18n();
  return (
    <section id="solution" className="py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">{t.solution.eyebrow}</Badge>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">
            {t.solution.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.solution.lead}</p>
        </div>

        <div className="mt-8">
          {t.solution.features.map((feature, i) => (
            <div
              key={feature.tag}
              className="mt-16 grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className={cn(i % 2 === 1 && 'md:order-last')}>
                <span className="mb-3 inline-block text-[13px] font-bold text-primary">
                  {feature.tag}
                </span>
                <h3 className="mb-3.5 text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[17px] text-muted-foreground">{feature.body}</p>
              </div>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-orange-50 to-white p-7">
                {VISUALS[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

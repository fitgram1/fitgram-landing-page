import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n';
import { Check } from 'lucide-react';

function PhoneMock() {
  const { t } = useI18n();
  const m = t.mock;
  const clients = [
    { initials: 'JM', name: 'João Marques', sub: 'Hypertrophy · Week 6', color: '#F97316', status: m.due, ok: false },
    { initials: 'AR', name: 'Ana Ribeiro', sub: 'Fat loss · Week 3', color: '#0ea5e9', status: m.onTrack, ok: true },
    { initials: 'PC', name: 'Pedro Costa', sub: 'Strength · Week 9', color: '#8b5cf6', status: m.newMessage, ok: false },
    { initials: 'MS', name: 'Marta Silva', sub: 'Recomp · Week 2', color: '#10b981', status: m.onTrack, ok: true },
  ];
  return (
    <div className="relative mx-auto w-[280px] rounded-[40px] bg-foreground p-3 shadow-2xl">
      <div className="absolute left-1/2 top-[22px] z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-foreground" />
      <div className="h-[560px] overflow-hidden rounded-[30px] bg-white">
        <div className="bg-primary px-5 pb-5 pt-9 text-primary-foreground">
          <div className="text-[13px] opacity-85">{m.greet}</div>
          <div className="mt-0.5 text-[22px] font-extrabold">{m.name}</div>
          <div className="mt-4 flex gap-2.5">
            {[
              { n: '18', l: m.active },
              { n: '4', l: m.needCheckin },
              { n: '12', l: m.plansSent },
            ].map((s) => (
              <div key={s.l} className="flex-1 rounded-xl bg-white/20 px-3 py-2.5">
                <div className="text-xl font-extrabold">{s.n}</div>
                <div className="text-[11px] opacity-85">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-muted-foreground">
            {m.todayFocus}
          </h4>
          {clients.map((c) => (
            <div key={c.initials} className="flex items-center gap-3 border-b border-border py-2.5">
              <div
                className="grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
              <span
                className={
                  c.ok
                    ? 'rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600'
                    : 'rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary'
                }
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <header className="py-16">
      <div className="container grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <Badge className="mb-4">{t.hero.eyebrow}</Badge>
          <h1 className="text-[clamp(34px,6vw,58px)] font-extrabold leading-[1.05] tracking-tight">
            {t.hero.headPre}
            <span className="text-primary">{t.hero.headHl}</span>
            {t.hero.headPost}
          </h1>
          <p className="mt-6 max-w-xl text-[clamp(17px,2vw,20px)] text-muted-foreground">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <ButtonLink href="#waitlist" size="pill" className="shadow-lg shadow-primary/30">
              {t.hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="#problem" variant="ghost" size="lg">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-primary" strokeWidth={3} />
            {t.hero.trust}
          </p>
        </div>
        <div className="md:order-last [order:-1]">
          <PhoneMock />
        </div>
      </div>
    </header>
  );
}

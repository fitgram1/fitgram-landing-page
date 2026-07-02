import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  TrendingUp,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/i18n";
import { PhoneMock } from "../subsections/PhoneMock";
import { FloatCard } from "../subsections/FloatCard";

export function Hero() {
  const { t } = useI18n();
  const floatMeta = [
    {
      icon: CheckCircle2,
      iconClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15",
      pos: "left-0 top-16 -translate-x-1/2",
      anim: "animate-float",
    },
    {
      icon: Users,
      iconClass: "bg-primary/15 text-primary",
      pos: "bottom-24 left-2 -translate-x-1/3",
      anim: "animate-float-slow",
    },
    {
      icon: TrendingUp,
      iconClass: "bg-sky-100 text-sky-600 dark:bg-sky-500/15",
      pos: "right-0 top-1/2 translate-x-1/4",
      anim: "animate-float",
    },
    {
      icon: ListChecks,
      iconClass: "bg-violet-100 text-violet-600 dark:bg-violet-500/15",
      pos: "right-0 top-10 translate-x-1/5",
      anim: "animate-float-slow",
    },
  ];

  return (
    <header id="home" className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
      <div
        className="bg-hero-mesh pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-2/3 text-primary/20"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <path
          d="M600 120 C 420 120, 420 300, 300 300 S 180 480, 0 480"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 12"
          className="animate-dash"
        />
      </svg>

      <div className="container grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Badge className=" rounded-md mb-5 gap-1.5">
              <Users className="size-3.5" />
              {t.hero.eyebrow}
            </Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-[clamp(34px,5.4vw,56px)] font-extrabold leading-[1.04] tracking-tight">
              {t.hero.headPre}
              <span className="text-primary">{t.hero.headHl}</span>
              {t.hero.headPost}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[clamp(16px,1.6vw,19px)] text-muted-foreground">
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink
                href="#waitlist"
                size="pill"
                className=" rounded-md cta-shine shadow-lg shadow-primary/30"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="size-5" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-5 text-sm font-medium text-muted-foreground">
              {t.hero.microcopy}
            </p>
          </Reveal>

          {/* <div className="mt-10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {t.hero.proofLabel}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5">
                {['#F97316', '#0ea5e9', '#8b5cf6', '#10b981'].map((c, i) => (
                  <span
                    key={c}
                    className="grid size-9 place-items-center rounded-full text-xs font-bold text-white ring-2 ring-background"
                    style={{ backgroundColor: c }}
                  >
                    {['SJ', 'MR', 'PC', 'AL'][i]}
                  </span>
                ))}
                <span className="grid size-9 place-items-center rounded-full bg-secondary text-[11px] font-bold text-foreground ring-2 ring-background">
                  +247
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">{t.hero.rating}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  <CountUp end={250} suffix="+" className="font-semibold text-foreground" />{' '}
                  {t.hero.ratingCount}
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="relative mx-auto flex w-full max-w-[300px] scale-90 items-center justify-center [perspective:1600px] sm:max-w-md sm:scale-100 md:order-last">

          <div
            className="animate-glow-pulse pointer-events-none absolute h-[340px] w-[340px] rounded-full bg-primary/25 blur-[120px]"
            aria-hidden
          />

          {floatMeta.map((f, i) => (
            <FloatCard
              key={i}
              icon={f.icon}
              iconClass={f.iconClass}
              title={t.hero.floating[i].title}
              value={t.hero.floating[i].value}
              className={f.pos}
              animation={f.anim}
            />
          ))}

          <div className="relative z-10 transition-transform duration-700 ease-out [transform:rotateY(-12deg)_rotateX(5deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)]">
            <PhoneMock />
          </div>
        </div>
      </div>
    </header>
  );
}

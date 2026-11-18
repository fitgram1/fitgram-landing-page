import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Dumbbell as DumbbellIcon } from 'lucide-react';
import { links } from '@/lib/links';
import { TLink } from '@/lib/nav';
import { useT } from '@/i18n';
import { Dumbbell2D } from './Dumbbell2D';
import { TrainingCard } from './TrainingCard';
import { Phone } from './Phone';
import { ProgressChart } from './ProgressChart';
import { NutritionPlate } from './NutritionPlate';

/** Escala um bloco de tamanho fixo para caber na largura disponível. */
function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const on = () => setS(Math.min(1, el.clientWidth / w));
    on();
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className="mx-auto w-full max-w-[740px]" style={{ height: h * s }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}

function Beat({ id, title, sub, children }: { id: string; title: string; sub: string; children: ReactNode }) {
  return (
    <section id={id} className="px-4 py-14">
      <h2 className="mx-auto max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-[460px] text-center text-[15px] text-muted-foreground">{sub}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** Versão vertical: ecrãs pequenos e movimento reduzido. Sem secções fixas nem WebGL. */
export function StoryStacked() {
  const t = useT();
  const copy = t.story;
  return (
    <div id="top" className="bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-16 pt-20 text-center">
        <svg viewBox="0 0 1280 200" className="absolute inset-x-0 top-1/2 -z-0 w-full -translate-y-1/2 opacity-20" aria-hidden>
          <path d="M0,100 L430,100 L475,70 L495,132 L525,-10 L555,172 L580,100 L760,82 L900,56 L1060,-20 L1280,-54" fill="none" stroke="#f97316" strokeWidth="3" />
        </svg>
        <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center">
          <p className="hero-rise inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-primary" style={{ ['--i' as string]: 0 }}>{copy.hero.eyebrow}</p>
          <h1 className="hero-rise mt-5 text-[42px] font-extrabold leading-[1.04] tracking-tight" style={{ ['--i' as string]: 1 }}>{copy.hero.headline}</h1>
          <p className="hero-rise mt-4 text-[17px] text-foreground/80" style={{ ['--i' as string]: 2 }}>{copy.hero.sub}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {/* «Começar agora» → «Tenho interesse» enquanto o registo está escondido. */}
            <TLink to={links.interest(t.getApp.interestSubject)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[16px] font-bold text-primary-foreground transition-transform duration-150 active:scale-[0.97]">
              {t.getApp.interested}
              <ArrowRight className="size-5" aria-hidden />
            </TLink>
            <TLink to={links.explore} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 text-[16px] font-semibold transition-transform duration-150 active:scale-[0.97]">
              <DumbbellIcon className="size-5" aria-hidden />
              {copy.hero.secondary}
            </TLink>
          </div>
        </div>
      </section>

      <Beat id="sec-movimento" title={copy.movement.title} sub={copy.movement.sub}>
        <Dumbbell2D className="mx-auto w-[260px]" />
        <div className="mt-6">
          <Fit w={420} h={230}>
            <TrainingCard showIcon />
          </Fit>
        </div>
      </Beat>

      <Beat id="sec-treinador" title={copy.coach.title} sub={copy.coach.sub}>
        <Fit w={300} h={616}>
          <Phone staticCard />
        </Fit>
      </Beat>

      <Beat id="sec-nutricao" title={copy.nutrition.title} sub={copy.nutrition.sub}>
        <Fit w={320} h={320}>
          <NutritionPlate shown />
        </Fit>
        <p className="mt-3 text-center text-[12px] text-muted-foreground">{t.common.demoTag}: {copy.mealNote}.</p>
      </Beat>

      <Beat id="sec-progresso" title={copy.progress.title} sub={copy.progress.sub}>
        <Fit w={740} h={430}>
          <ProgressChart />
        </Fit>
      </Beat>
    </div>
  );
}

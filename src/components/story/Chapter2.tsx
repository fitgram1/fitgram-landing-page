import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { links } from '@/lib/links';
import { TLink } from '@/lib/nav';
import { copy } from './copy';
import { formats, sports, ecosystem } from './chapter2Data';

const W = 1280;
const H = 720;

function Title({ cls, title, sub }: { cls: string; title: string; sub: string }) {
  return (
    <div className={`${cls} absolute left-[190px] top-[40px] w-[900px] text-center`}>
      <h2 className="text-[40px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-[16px] text-muted-foreground">{sub}</p>
    </div>
  );
}

export function FormatCard({ i }: { i: number }) {
  const f = formats[i];
  const Icon = f.icon;
  return (
    <div className="h-[300px] w-[640px] rounded-2xl border border-border bg-card p-7 shadow-2xl">
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Icon className="size-7" aria-hidden />
        </span>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-primary">{f.label}</p>
          <p className="text-[24px] font-bold leading-tight text-foreground">{f.title}</p>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-3">
        {f.lines.map((l) => (
          <div key={l.label} className="rounded-xl bg-foreground/[0.05] px-3 py-4 text-center">
            <p className="whitespace-nowrap text-[21px] font-extrabold leading-none text-foreground">{l.value}</p>
            <p className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">{l.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[12px] text-muted-foreground">{copy.demoTag}</p>
    </div>
  );
}

/** Capítulo 2 (desktop): formatos → modalidades → ecossistema → final. Uma linha temporal presa ao scroll. */
export function Chapter2() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const view = root.current!.querySelector<HTMLElement>('.sticky-view')!;
    const fit = () => {
      const s = Math.min(view.clientWidth / W, view.clientHeight / H);
      stage.current!.style.transform = `scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(() => {
      fit();
      ScrollTrigger.refresh();
    });
    ro.observe(view);

    const ctx = gsap.context(() => {
      gsap.set(['.c-b', '.c-c', '.c-d'], { autoAlpha: 0 });
      gsap.set('.fp', { autoAlpha: 0, y: 24 });
      gsap.set('.fp-0', { autoAlpha: 1, y: 0 });
      gsap.set('.sp', { autoAlpha: 0, y: 40, scale: 0.9 });
      gsap.set('.eco-node', { autoAlpha: 0, scale: 0.6 });
      gsap.set('.eco-line', { strokeDashoffset: 1 });
      gsap.set('.eco-dot', { autoAlpha: 0 });
      gsap.set('.fin > *', { autoAlpha: 0, y: 30 });
      gsap.set('.fin-glow', { scale: 0.3, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const T = (t: gsap.TweenTarget, v: gsap.TweenVars, at: number, d: number) => tl.to(t, { ...v, duration: d }, at);

      // A. Formatos (0 – 0.27): o cartão muda de formato à medida que se desce.
      const step = 0.038;
      formats.forEach((_, i) => {
        const at = 0.02 + i * step;
        if (i === 0) T('.fc-0', { className: '+=stage-chip-on' }, 0, 0.01);
        if (i > 0) {
          T(`.fp-${i - 1}`, { autoAlpha: 0, y: -24 }, at, 0.012);
          T(`.fp-${i}`, { autoAlpha: 1, y: 0 }, at + 0.006, 0.014);
          T(`.fc-${i - 1}`, { className: '-=stage-chip-on' }, at, 0.01);
          T(`.fc-${i}`, { className: '+=stage-chip-on' }, at, 0.01);
        }
      });
      T('.c-a', { autoAlpha: 0, y: -30 }, 0.25, 0.03);

      // B. Modalidades (0.27 – 0.52)
      T('.c-b', { autoAlpha: 1 }, 0.27, 0.02);
      tl.to('.sp', { autoAlpha: 1, y: 0, scale: 1, duration: 0.03, stagger: 0.012, ease: 'power2.out' }, 0.28);
      sports.forEach((_, i) => {
        const at = 0.36 + i * 0.022;
        T(`.sp-${i}`, { className: '+=stage-card-on', y: -8 }, at, 0.01);
        T(`.sp-${i}`, { className: '-=stage-card-on', y: 0 }, at + 0.022, 0.01);
      });
      T('.c-b', { autoAlpha: 0, y: -30 }, 0.52, 0.03);

      // C. Ecossistema (0.55 – 0.78)
      T('.c-c', { autoAlpha: 1 }, 0.55, 0.02);
      tl.to('.eco-node', { autoAlpha: 1, scale: 1, duration: 0.03, stagger: 0.03, ease: 'back.out(1.6)' }, 0.56);
      T('.eco-line', { strokeDashoffset: 0 }, 0.6, 0.08);
      T('.eco-dot', { autoAlpha: 1 }, 0.66, 0.005);
      T('.eco-dot', { attr: { cx: 910, cy: 300 } }, 0.665, 0.04);
      T('.eco-dot', { attr: { cx: 640, cy: 540 } }, 0.705, 0.04);
      T('.eco-dot', { attr: { cx: 370, cy: 300 } }, 0.745, 0.04);
      T('.c-c', { autoAlpha: 0, scale: 0.96 }, 0.8, 0.03);

      // D. Final (0.82 – 1)
      T('.fin-glow', { scale: 1.4, autoAlpha: 1 }, 0.82, 0.14);
      tl.to('.fin > *', { autoAlpha: 1, y: 0, duration: 0.035, stagger: 0.025, ease: 'power2.out' }, 0.84);
      T('.c-d', { autoAlpha: 1 }, 0.82, 0.01);
      tl.set({}, {}, 1);

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, stage);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="formatos"
      aria-label="FitGram — formatos, modalidades e ecossistema"
      className="relative bg-background"
      style={{ height: '560vh' }}
    >
      <div className="sticky-view sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 text-foreground"
          style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transformOrigin: 'center' }}
        >
          {/* A — formatos */}
          <div className="c-a absolute inset-0">
            <Title cls="" title="Qualquer treino. Qualquer formato." sub="Força, corrida, intervalos, AMRAP, EMOM ou HYROX — o cartão adapta-se." />
            <div className="absolute left-[190px] top-[170px] flex w-[900px] flex-wrap justify-center gap-2.5">
              {formats.map((f, i) => {
                const Icon = f.icon;
                return (
                  <span
                    key={f.key}
                    className={`fc-${i} inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-5 py-2.5 text-[15px] font-semibold text-foreground/80`}
                  >
                    <Icon className="size-4" aria-hidden />
                    {f.label}
                  </span>
                );
              })}
            </div>
            <div className="absolute left-[320px] top-[260px]">
              {formats.map((_, i) => (
                <div key={i} className={`fp fp-${i} absolute left-0 top-0`}>
                  <FormatCard i={i} />
                </div>
              ))}
            </div>
          </div>

          {/* B — modalidades */}
          <div className="c-b absolute inset-0">
            <Title cls="" title="Cada modalidade, as suas variáveis." sub="Distância, ritmo, estações, metros — o registo fala a língua do desporto." />
            <div className="absolute left-[120px] top-[190px] grid w-[1040px] grid-cols-3 gap-5">
              {sports.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`sp sp-${i} rounded-2xl border border-border bg-foreground/[0.03] p-6`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <p className="text-[22px] font-bold">{s.label}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.vars.map((v) => (
                        <span key={v} className="rounded-full bg-foreground/[0.07] px-3 py-1 text-[13px] text-foreground/80">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* C — ecossistema */}
          <div className="c-c absolute inset-0">
            <Title cls="" title="Treino. Nutrição. Progresso." sub="Um ciclo único: o que fazes alimenta o que evolui." />
            <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" aria-hidden>
              <path className="eco-line" pathLength={1} strokeDasharray={1} d="M370,300 L910,300 L640,540 L370,300" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" opacity="0.6" />
              <circle className="eco-dot" cx="370" cy="300" r="9" fill="#f97316" style={{ filter: 'drop-shadow(0 0 10px #f97316)' }} />
            </svg>
            {ecosystem.map((e, i) => (
              <div
                key={e.label}
                className="eco-node absolute w-[260px] rounded-2xl border border-primary/30 bg-card p-5 text-center shadow-xl shadow-primary/10"
                style={{ left: [370, 910, 640][i] - 130, top: [300, 300, 540][i] - 45 }}
              >
                <p className="text-[24px] font-extrabold text-primary">{e.label}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{e.sub}</p>
              </div>
            ))}
          </div>

          {/* D — final */}
          <div className="c-d absolute inset-0 grid place-items-center">
            <div className="fin-glow absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
            <div className="fin relative flex w-[900px] flex-col items-center text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary text-[28px] font-extrabold">F</span>
              <h2 className="mt-6 text-[64px] font-extrabold leading-[1.04] tracking-tight">O próximo nível começa contigo.</h2>
              <p className="mt-4 text-[19px] text-foreground/80">Entra na beta e ajuda a moldar o FitGram desde o primeiro dia.</p>
              <div className="mt-8 flex gap-3">
                <TLink to={links.waitlist} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]">
                  Candidatar-me à beta
                  <ArrowRight className="size-5" aria-hidden />
                </TLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

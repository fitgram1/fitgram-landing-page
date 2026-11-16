import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { links } from '@/lib/links';
import { TLink } from '@/lib/nav';
import { copy } from './copy';
import { formats, sports, ecosystem } from './chapter2Data';

const SIZE = { desktop: { w: 1280, h: 720 }, mobile: { w: 400, h: 760 } } as const;

/** Nós do ecossistema (centro de cada cartão) e percurso do ponto, por layout. */
const ECO = {
  desktop: [[370, 300], [910, 300], [640, 540]],
  mobile: [[130, 220], [270, 400], [130, 580]],
} as const;

function Title({ cls, title, sub, mobile }: { cls: string; title: string; sub: string; mobile: boolean }) {
  if (mobile) {
    return (
      <div className={`${cls} absolute left-[22px] top-[14px] w-[356px]`}>
        <h2 className="text-[27px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
        <p className="mt-1.5 text-[14px] leading-snug text-muted-foreground">{sub}</p>
      </div>
    );
  }
  return (
    <div className={`${cls} absolute left-[190px] top-[40px] w-[900px] text-center`}>
      <h2 className="text-[40px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-[16px] text-muted-foreground">{sub}</p>
    </div>
  );
}

export function FormatCard({ i, compact = false }: { i: number; compact?: boolean }) {
  const f = formats[i];
  const Icon = f.icon;
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-2xl ${compact ? 'w-[356px] p-5' : 'h-[300px] w-[640px] p-7'}`}>
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Icon className="size-7" aria-hidden />
        </span>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-primary">{f.label}</p>
          <p className="text-[24px] font-bold leading-tight text-foreground">{f.title}</p>
        </div>
      </div>
      <div className={`grid gap-3 ${compact ? 'mt-5 grid-cols-2' : 'mt-7 grid-cols-4'}`}>
        {f.lines.map((l) => (
          <div key={l.label} className={`rounded-xl bg-foreground/[0.05] px-3 text-center ${compact ? 'py-3' : 'py-4'}`}>
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
export function Chapter2({ mobile = false }: { mobile?: boolean }) {
  const { w: W, h: H } = SIZE[mobile ? 'mobile' : 'desktop'];
  const eco = ECO[mobile ? 'mobile' : 'desktop'];
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

      const $q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel);
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const T = (t: gsap.TweenTarget, v: gsap.TweenVars, at: number, d: number) => tl.to(t, { ...v, duration: d }, at);

      // A. Formatos (0 – 0.27): o cartão muda de formato à medida que se desce.
      const step = 0.038;
      formats.forEach((_, i) => {
        const at = 0.02 + i * step;
        if (i > 0) {
          T(`.fp-${i - 1}`, { autoAlpha: 0, y: -24 }, at, 0.012);
          T(`.fp-${i}`, { autoAlpha: 1, y: 0 }, at + 0.006, 0.014);
        }
      });
      T('.c-a', { autoAlpha: 0, y: -30 }, 0.25, 0.03);

      // B. Modalidades (0.27 – 0.52)
      T('.c-b', { autoAlpha: 1 }, 0.27, 0.02);
      tl.to('.sp', { autoAlpha: 1, y: 0, scale: 1, duration: 0.03, stagger: 0.012, ease: 'power2.out' }, 0.28);
      sports.forEach((_, i) => {
        const at = 0.36 + i * 0.022;
        T(`.sp-${i}`, { y: -8 }, at, 0.01);
        T(`.sp-${i}`, { y: 0 }, at + 0.022, 0.01);
      });
      T('.c-b', { autoAlpha: 0, y: -30 }, 0.52, 0.03);

      // C. Ecossistema (0.55 – 0.78)
      T('.c-c', { autoAlpha: 1 }, 0.55, 0.02);
      tl.to('.eco-node', { autoAlpha: 1, scale: 1, duration: 0.03, stagger: 0.03, ease: 'back.out(1.6)' }, 0.56);
      T('.eco-line', { strokeDashoffset: 0 }, 0.6, 0.08);
      T('.eco-dot', { autoAlpha: 1 }, 0.66, 0.005);
      T('.eco-dot', { attr: { cx: eco[1][0], cy: eco[1][1] } }, 0.665, 0.04);
      T('.eco-dot', { attr: { cx: eco[2][0], cy: eco[2][1] } }, 0.705, 0.04);
      T('.eco-dot', { attr: { cx: eco[0][0], cy: eco[0][1] } }, 0.745, 0.04);
      T('.c-c', { autoAlpha: 0, scale: 0.96 }, 0.8, 0.03);

      // D. Final (0.82 – 1)
      T('.fin-glow', { scale: 1.4, autoAlpha: 1 }, 0.82, 0.14);
      tl.to('.fin > *', { autoAlpha: 1, y: 0, duration: 0.035, stagger: 0.025, ease: 'power2.out' }, 0.84);
      T('.c-d', { autoAlpha: 1 }, 0.82, 0.01);
      tl.set({}, {}, 1);

      // Realces por classe: calculados a partir do progresso (não de tweens `className`), para
      // continuarem corretos quando o scroll salta (âncoras, deslizar rápido, voltar atrás).
      const chips = $q('.fc');
      const cards = $q('.sp');
      const step2 = step;
      const paint = (p: number) => {
        const on = p < 0.02 + step2 ? 0 : Math.min(formats.length - 1, Math.floor((p - 0.02) / step2));
        chips.forEach((el, i) => el.classList.toggle('stage-chip-on', i === on));
        const k = Math.floor((p - 0.36) / 0.022);
        cards.forEach((el, i) => el.classList.toggle('stage-card-on', i === k));
      };
      paint(0);

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
      });
    }, stage);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, [W, H, eco]);

  return (
    <section
      ref={root}
      id="formatos"
      aria-label="FitGram — formatos, modalidades e ecossistema"
      className="relative bg-background"
      style={{ height: mobile ? '520svh' : '560vh' }}
    >
      <div className={`sticky-view sticky top-16 w-full overflow-hidden ${mobile ? 'h-[calc(100svh-4rem)]' : 'h-[calc(100vh-4rem)]'}`}>
        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 text-foreground"
          style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transformOrigin: 'center' }}
        >
          {/* A — formatos */}
          <div className="c-a absolute inset-0">
            <Title mobile={mobile} cls="" title="Qualquer treino. Qualquer formato." sub="Força, corrida, intervalos, AMRAP, EMOM ou HYROX — o cartão adapta-se." />
            <div className={`absolute flex flex-wrap gap-2.5 ${mobile ? 'left-[22px] top-[132px] w-[356px] gap-2' : 'left-[190px] top-[170px] w-[900px] justify-center'}`}>
              {formats.map((f, i) => {
                const Icon = f.icon;
                return (
                  <span
                    key={f.key}
                    className={`fc fc-${i} inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] font-semibold text-foreground/80 ${mobile ? 'px-3.5 py-2 text-[13px]' : 'px-5 py-2.5 text-[15px]'}`}
                  >
                    <Icon className="size-4" aria-hidden />
                    {f.label}
                  </span>
                );
              })}
            </div>
            <div className={`absolute ${mobile ? 'left-[22px] top-[250px]' : 'left-[320px] top-[260px]'}`}>
              {formats.map((_, i) => (
                <div key={i} className={`fp fp-${i} absolute left-0 top-0`}>
                  <FormatCard i={i} compact={mobile} />
                </div>
              ))}
            </div>
          </div>

          {/* B — modalidades */}
          <div className="c-b absolute inset-0">
            <Title mobile={mobile} cls="" title="Cada modalidade, as suas variáveis." sub="Distância, ritmo, estações, metros — o registo fala a língua do desporto." />
            <div className={`absolute grid ${mobile ? 'left-[22px] top-[136px] w-[356px] grid-cols-2 gap-3' : 'left-[120px] top-[190px] w-[1040px] grid-cols-3 gap-5'}`}>
              {sports.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`sp sp-${i} rounded-2xl border border-border bg-foreground/[0.03] ${mobile ? 'p-4' : 'p-6'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <p className={`font-bold ${mobile ? 'text-[18px]' : 'text-[22px]'}`}>{s.label}</p>
                    </div>
                    <div className={`flex flex-wrap gap-2 ${mobile ? 'mt-3' : 'mt-4'}`}>
                      {s.vars.map((v) => (
                        <span key={v} className={`rounded-full bg-foreground/[0.07] text-foreground/80 ${mobile ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[13px]'}`}>
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
            <Title mobile={mobile} cls="" title="Treino. Nutrição. Progresso." sub="Um ciclo único: o que fazes alimenta o que evolui." />
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <path className="eco-line" pathLength={1} strokeDasharray={1} d={`M${eco[0]} L${eco[1]} L${eco[2]} L${eco[0]}`} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" opacity="0.6" />
              <circle className="eco-dot" cx={eco[0][0]} cy={eco[0][1]} r="9" fill="#f97316" style={{ filter: 'drop-shadow(0 0 10px #f97316)' }} />
            </svg>
            {ecosystem.map((e, i) => (
              <div
                key={e.label}
                className={`eco-node absolute rounded-2xl border border-primary/30 bg-card text-center shadow-xl shadow-primary/10 ${mobile ? 'w-[220px] p-4' : 'w-[260px] p-5'}`}
                style={{ left: eco[i][0] - (mobile ? 110 : 130), top: eco[i][1] - 45 }}
              >
                <p className={`font-extrabold text-primary ${mobile ? 'text-[21px]' : 'text-[24px]'}`}>{e.label}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{e.sub}</p>
              </div>
            ))}
          </div>

          {/* D — final */}
          <div className="c-d absolute inset-0 grid place-items-center">
            <div className={`fin-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 ${mobile ? 'size-[320px] blur-[80px]' : 'size-[560px] blur-[120px]'}`} />
            <div className={`fin relative flex flex-col items-center text-center ${mobile ? 'w-[340px]' : 'w-[900px]'}`}>
              <span className="grid size-14 place-items-center rounded-2xl bg-primary text-[28px] font-extrabold">F</span>
              <h2 className={`mt-6 font-extrabold tracking-tight ${mobile ? 'text-[34px] leading-[1.08]' : 'text-[64px] leading-[1.04]'}`}>O próximo nível começa contigo.</h2>
              <p className={`mt-4 text-foreground/80 ${mobile ? 'text-[15px]' : 'text-[19px]'}`}>Cria a tua conta e começa hoje.</p>
              <div className="mt-8 flex gap-3">
                <TLink to={links.signup} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]">
                  Criar conta
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

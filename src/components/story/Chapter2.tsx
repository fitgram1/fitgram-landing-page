import { useLayoutEffect, useRef } from 'react';
import badge from '@/assets/fitgram-treinador-atleta.webp';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { useT } from '@/i18n';
import { sportScenes } from './chapter2Data';
import { SportBackdrop } from './SportBackdrop';
import { SportAthletes } from './SportAthletes';
import { Dumbbell2D } from './Dumbbell2D';
import { NutritionPlate } from './NutritionPlate';

const SIZE = { desktop: { w: 1280, h: 720 }, mobile: { w: 400, h: 760 } } as const;

/** Linha temporal das modalidades: cada desporto abre-se a partir do centro. */
const SPORT_START = 0.04;
const SPORT_STEP = 0.15;

/** Ciclo Treino → Nutrição → Progresso: centro e raio do anel, por layout. */
const CYCLE = { desktop: { cx: 640, cy: 440, r: 190 }, mobile: { cx: 200, cy: 450, r: 120 } } as const;

/** Imagem de cada pilar do ciclo: haltere, prato e gráfico de evolução. */
function CycleArt({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.35),transparent_70%)]">
        <Dumbbell2D className="w-[82%] -rotate-12" />
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.5]">
          <NutritionPlate shown />
        </div>
      </div>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full bg-[radial-gradient(circle_at_50%_60%,rgba(249,115,22,0.3),transparent_70%)]" aria-hidden>
      <path d="M14 74 L30 66 L42 69 L56 52 L70 47 L86 26 L86 84 L14 84 Z" fill="#f97316" fillOpacity="0.18" />
      <path d="M14 74 L30 66 L42 69 L56 52 L70 47 L86 26" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="86" cy="26" r="6" fill="#fde047" />
    </svg>
  );
}

function Title({ cls, title, sub, mobile, light = false }: { cls: string; title: string; sub: string; mobile: boolean; light?: boolean }) {
  const h = light ? 'text-white' : 'text-foreground';
  const p = light ? 'text-white/70' : 'text-muted-foreground';
  if (mobile) {
    return (
      <div className={`${cls} absolute left-[22px] top-[14px] w-[356px]`}>
        <h2 className={`text-[27px] font-extrabold leading-[1.08] tracking-tight ${h}`}>{title}</h2>
        <p className={`mt-1.5 text-[14px] leading-snug ${p}`}>{sub}</p>
      </div>
    );
  }
  return (
    <div className={`${cls} absolute left-[190px] top-[40px] w-[900px] text-center`}>
      <h2 className={`text-[40px] font-extrabold leading-[1.08] tracking-tight ${h}`}>{title}</h2>
      <p className={`mt-2 text-[16px] ${p}`}>{sub}</p>
    </div>
  );
}

/** Capítulo 2: modalidades (transformação) → ciclo treino/nutrição/progresso. Uma linha temporal presa ao scroll. */
export function Chapter2({ mobile = false }: { mobile?: boolean }) {
  const t = useT();
  const c2 = t.chapter2;
  const { w: W, h: H } = SIZE[mobile ? 'mobile' : 'desktop'];
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const nSports = sportScenes.length;
  const cyc = CYCLE[mobile ? 'mobile' : 'desktop'];
  const node = mobile ? 92 : 150;
  const core = mobile ? 110 : 190;

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

    const CLOSED = 'circle(0% at 50% 55%)';
    const OPEN = 'circle(150% at 50% 55%)';

    const ctx = gsap.context(() => {
      // Estado inicial: a Corrida já está aberta; o resto entra com o scroll.
      gsap.set('.c-c', { autoAlpha: 0 });
      gsap.set('.cy-ring', { strokeDashoffset: 1 });
      gsap.set('.cy-node', { autoAlpha: 0, scale: 0.4 });
      gsap.set('.cy-core', { autoAlpha: 0, scale: 0.5 });
      gsap.set('.cy-comet', { autoAlpha: 0 });
      gsap.set('.sb', { clipPath: CLOSED });
      gsap.set('.sb-0', { clipPath: OPEN });
      gsap.set('.sc', { autoAlpha: 0, y: 60, scale: 0.92 });
      gsap.set('.sc-word', { yPercent: 110 });
      gsap.set('.sc-0', { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set('.sc-0 .sc-word', { yPercent: 0 });
      gsap.set('.sic', { autoAlpha: 0, scale: 0.3, rotation: 140, transformOrigin: '50% 50%' });
      gsap.set('.sic-0', { autoAlpha: 1, scale: 1, rotation: 0 });

      const $q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, root.current);
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const T = (tg: gsap.TweenTarget, v: gsap.TweenVars, at: number, d: number) => tl.to(tg, { ...v, duration: d }, at);

      // Modalidades: cada desporto abre-se em círculo sobre o anterior.
      for (let i = 1; i < nSports; i++) {
        const at = SPORT_START + (i - 1) * SPORT_STEP;
        T(`.sb-${i}`, { clipPath: OPEN, ease: 'power2.in' }, at, 0.05);
        T(`.sc-${i - 1}`, { autoAlpha: 0, y: -50, scale: 1.05 }, at, 0.02);
        // o ícone grande transforma-se no da modalidade seguinte
        T(`.sic-${i - 1}`, { autoAlpha: 0, scale: 0.3, rotation: -140, ease: 'power2.in' }, at, 0.03);
        T(`.sic-${i}`, { autoAlpha: 1, scale: 1, rotation: 0, ease: 'back.out(1.7)' }, at + 0.022, 0.04);
        T(`.sc-${i}`, { autoAlpha: 1, y: 0, scale: 1, ease: 'power3.out' }, at + 0.02, 0.03);
        tl.to(`.sc-${i} .sc-word`, { yPercent: 0, duration: 0.03, ease: 'power3.out' }, at + 0.02);
        tl.fromTo(`.sc-${i} .sc-var`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.02, stagger: 0.006, ease: 'power2.out', immediateRender: false }, at + 0.035);
      }
      const sportsEnd = SPORT_START + (nSports - 1) * SPORT_STEP + 0.06;

      T('.c-b', { autoAlpha: 0 }, sportsEnd, 0.03);
      T('.sb-wrap', { autoAlpha: 0 }, sportsEnd, 0.03);

      // Ciclo: o anel desenha-se, os três pilares acendem e o cometa dá a volta.
      const cy = sportsEnd + 0.03;
      T('.c-c', { autoAlpha: 1 }, cy, 0.02);
      T('.cy-core', { autoAlpha: 1, scale: 1, ease: 'back.out(1.8)' }, cy + 0.01, 0.03);
      T('.cy-ring', { strokeDashoffset: 0 }, cy + 0.02, 0.06);
      tl.to('.cy-node', { autoAlpha: 1, scale: 1, duration: 0.03, stagger: 0.025, ease: 'back.out(1.8)' }, cy + 0.03);
      T('.cy-comet', { autoAlpha: 1 }, cy + 0.06, 0.01);

      tl.set({}, {}, 1);

      // Desporto ativo na barra, calculado a partir do progresso (certo mesmo quando o scroll salta).
      const rail = $q('.sr');
      const paint = (p: number) => {
        const k = p < SPORT_START + 0.02 ? 0 : Math.min(nSports - 1, 1 + Math.floor((p - SPORT_START - 0.02) / SPORT_STEP));
        rail.forEach((el, i) => el.classList.toggle('sr-on', i === k));
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
    }, root);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, [W, H, nSports, cyc]);

  return (
    <section ref={root} id="formatos" aria-label={c2.aria} className="relative bg-background" style={{ height: mobile ? '440svh' : '460vh' }}>
      <div className={`sticky-view sticky top-16 w-full overflow-hidden ${mobile ? 'h-[calc(100svh-4rem)]' : 'h-[calc(100vh-4rem)]'}`}>
        {/* Cenários das modalidades: ocupam o ecrã todo, fora do palco escalado. */}
        <div className="sb-wrap pointer-events-none absolute inset-0" aria-hidden>
          {sportScenes.map((s, i) => (
            <div key={s.key} className={`sb sb-${i} absolute inset-0`} style={{ background: s.bg, clipPath: 'circle(0% at 50% 55%)' }}>
              <SportBackdrop kind={s.key} accent={s.accent} />
            </div>
          ))}
        </div>

        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 text-foreground"
          style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transformOrigin: 'center' }}
        >
          {/* B — modalidades (transformação) */}
          <div className="c-b absolute inset-0">
            <Title mobile={mobile} cls="" title={c2.sports.title} sub={c2.sports.sub} light />
            {sportScenes.map((s, i) => {
              const sp = c2.sportItems[i];
              const Icon = s.icon;
              return (
                <div key={s.key} className={`sc sc-${i} absolute ${mobile ? 'left-[22px] top-[150px] w-[356px]' : 'left-[120px] top-[170px] w-[1040px]'}`}>
                  <div className="flex items-center gap-3" style={{ color: s.accent }}>
                    <span className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur" style={{ boxShadow: `0 0 20px ${s.accent}33` }}>
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <span className="text-[13px] font-bold uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')} / {String(nSports).padStart(2, '0')}</span>
                  </div>
                  <div className="pb-2 [clip-path:inset(-120px_-240px_0_-240px)]">
                    <p
                      className={`sc-word font-black uppercase leading-[0.9] tracking-tighter text-white ${mobile ? 'mt-3 text-[48px]' : 'mt-4 text-[104px]'}`}
                      style={{ textShadow: `0 0 40px ${s.accent}33` }}
                    >
                      {sp.label}
                    </p>
                  </div>
                  <p className={`font-semibold text-white/85 ${mobile ? 'text-[17px]' : 'text-[24px]'}`}>{sp.tagline}</p>
                  <div className={`grid gap-3 ${mobile ? 'mt-6 grid-cols-1' : 'mt-8 w-[700px] grid-cols-3'}`}>
                    {sp.vars.map((v) => (
                      <div key={v.label} className="sc-var rounded-2xl border border-white/15 bg-black/30 px-5 py-4 backdrop-blur-md">
                        <p className={`font-extrabold tabular-nums text-white ${mobile ? 'text-[24px]' : 'text-[30px]'}`}>{v.value}</p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: s.accent }}>
                          {v.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* ícone grande que muda de desporto para desporto */}
            <div className={`pointer-events-none absolute ${mobile ? 'right-[18px] top-[118px] size-[96px]' : 'left-[880px] top-[150px] size-[300px]'}`} aria-hidden>
              {sportScenes.map((s, i) => {
                return (
                  <div
                    key={s.key}
                    className={`sic sic-${i} absolute inset-0 grid place-items-center rounded-full border border-white/15 bg-black/30 backdrop-blur-md`}
                    style={{ color: s.accent, boxShadow: `0 0 80px ${s.accent}40, inset 0 0 40px ${s.accent}25` }}
                  >
                    <div className="sic-spin absolute inset-[6%] rounded-full border-2 border-dashed" style={{ borderColor: `${s.accent}55` }} />
                    <div className="absolute inset-[9%]">
                      <SportAthletes kind={s.key} accent={s.accent} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* barra de modalidades */}
            <div className={`absolute flex ${mobile ? 'bottom-[18px] left-[22px] w-[356px] flex-wrap gap-1.5' : 'bottom-[34px] left-[120px] gap-2'}`}>
              {sportScenes.map((s, i) => {
                const Icon = s.icon;
                return (
                  <span
                    key={s.key}
                    className={`sr inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 font-semibold text-white/60 backdrop-blur ${mobile ? 'px-2.5 py-1 text-[11px]' : 'px-4 py-2 text-[13px]'}`}
                    style={{ ['--acc' as string]: s.accent }}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {c2.sportItems[i].label}
                  </span>
                );
              })}
            </div>
            <p className={`absolute text-[11px] text-white/60 ${mobile ? 'bottom-[4px] left-[22px]' : 'bottom-[12px] left-[120px]'}`}>{t.common.demoTag}</p>
          </div>

          {/* C — ciclo treino / nutrição / progresso */}
          <div className="c-c absolute inset-0">
            <Title mobile={mobile} cls="" title={c2.eco.title} sub={c2.eco.sub} />
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="cy-glow">
                  <stop offset="0" stopColor="#f97316" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={cyc.cx} cy={cyc.cy} r={cyc.r * 1.15} fill="url(#cy-glow)" />
              <circle cx={cyc.cx} cy={cyc.cy} r={cyc.r} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
              <circle
                className="cy-ring"
                cx={cyc.cx}
                cy={cyc.cy}
                r={cyc.r}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                transform={`rotate(-90 ${cyc.cx} ${cyc.cy})`}
              />
              <g className="cy-comet">
                <g className="cy-orbit" style={{ transformBox: 'view-box', transformOrigin: `${cyc.cx}px ${cyc.cy}px` }}>
                <circle cx={cyc.cx + cyc.r} cy={cyc.cy} r="9" fill="#fde047" style={{ filter: 'drop-shadow(0 0 12px #f97316)' }} />
                <path
                  d={`M ${cyc.cx + cyc.r} ${cyc.cy} A ${cyc.r} ${cyc.r} 0 0 0 ${cyc.cx + cyc.r * Math.cos(-0.5)} ${cyc.cy + cyc.r * Math.sin(-0.5)}`}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                </g>
              </g>
            </svg>
            <div
              className="cy-core absolute"
              style={{ left: cyc.cx - core / 2, top: cyc.cy - core / 2, width: core, height: core }}
            >
              <img src={badge} alt="" className="h-full w-full select-none rounded-full shadow-[0_0_70px_rgba(249,115,22,0.55)]" draggable={false} />
            </div>
            {c2.ecosystem.map((e, i) => {
              const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
              const x = cyc.cx + cyc.r * Math.cos(a);
              const y = cyc.cy + cyc.r * Math.sin(a);
              const left = i === 2;
              return (
                <div key={i} className="cy-node absolute" style={{ left: x - node / 2, top: y - node / 2, width: node, height: node }}>
                  <div className="h-full w-full overflow-hidden rounded-full border-2 border-primary/70 bg-card shadow-2xl shadow-primary/30">
                    <CycleArt i={i} />
                  </div>
                  <div
                    className={`absolute top-1/2 w-[230px] -translate-y-1/2 ${mobile ? 'hidden' : ''} ${
                      left ? 'right-full mr-4 text-right' : 'left-full ml-4 text-left'
                    }`}
                  >
                    <p className={`font-extrabold text-foreground ${mobile ? 'text-[16px]' : 'text-[24px]'}`}>{e.label}</p>
                    <p className={`text-muted-foreground ${mobile ? 'text-[11px]' : 'text-[14px]'}`}>{e.sub}</p>
                  </div>
                </div>
              );
            })}
            {mobile && (
              <ul className="cy-node absolute left-[22px] top-[630px] w-[356px] space-y-2">
                {c2.ecosystem.map((e) => (
                  <li key={e.label} className="flex items-baseline gap-2 text-[13px]">
                    <span className="font-extrabold text-primary">{e.label}</span>
                    <span className="text-muted-foreground">{e.sub}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

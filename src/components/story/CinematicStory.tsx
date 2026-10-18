import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Dumbbell as DumbbellIcon } from 'lucide-react';
import { TLink } from '@/lib/nav';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { links } from '@/lib/links';
import { copy } from './copy';
import { HeroLine } from './HeroLine';
import { Dumbbell2D } from './Dumbbell2D';
import { initialDumbbell, type DumbbellState } from './dumbbellState';
import { TrainerWindow } from './TrainerWindow';
import { TrainingCard } from './TrainingCard';
import { Phone } from './Phone';
import { NutritionPlate } from './NutritionPlate';
import { ProgressChart } from './ProgressChart';

const Dumbbell3D = lazy(() => import('./Dumbbell3D'));

const DESIGN_W = 1280;
const DESIGN_H = 720;

const chips = [
  { label: 'Exercício', value: copy.exercise.name, x: 330, y: 190 },
  { label: 'Séries', value: '3', x: 720, y: 196 },
  { label: 'Repetições', value: '12', x: 262, y: 330 },
  { label: 'Carga', value: '24 kg', x: 796, y: 334 },
  { label: 'Descanso', value: '90 s', x: 340, y: 470 },
  { label: 'RPE', value: '8', x: 728, y: 472 },
];

const mmss = (s: number) => {
  const v = Math.max(0, Math.round(s));
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
};

function Heading({ cls, title, sub, center = false }: { cls: string; title: string; sub: string; center?: boolean }) {
  return (
    <div className={`${cls} absolute ${center ? 'left-[240px] top-[36px] w-[800px] text-center' : 'left-[80px] top-[36px] w-[580px]'}`}>
      <h2 className="text-[38px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-[15px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function HeroCta() {
  return (
    <TLink
      to={links.signup}
      className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-[16px] font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {copy.hero.primary}
      <ArrowRight className="size-5" aria-hidden />
    </TLink>
  );
}

/** Versão fixa (desktop): uma única linha temporal GSAP controlada pelo scroll. */
export function CinematicStory({ webgl }: { webgl: boolean }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const dumbbell = useRef<DumbbellState>(initialDumbbell());
  const [live, setLive] = useState(false);
  // O haltere 3D só existe até ao cartão aterrar no telemóvel (~48 %); depois liberta a GPU.
  const [dbOn, setDbOn] = useState(true);

  // Só monta o canvas WebGL enquanto a história está perto do ecrã.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ajusta o espaço de design 1280×720 ao ecrã.
  useLayoutEffect(() => {
    const el = root.current?.querySelector<HTMLElement>('.sticky-view');
    if (!el || !stage.current) return;
    const fit = () => {
      const s = Math.min(el.clientWidth / DESIGN_W, el.clientHeight / DESIGN_H);
      scaleRef.current = s;
      stage.current!.style.transform = `scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(() => {
      fit();
      ScrollTrigger.refresh();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(stage.current);
    const $ = (s: string) => q(s) as HTMLElement[];
    const one = (s: string) => $(s)[0];

    const ctx = gsap.context(() => {
      // ---------- estados iniciais ----------
      gsap.set('.hero-intro > *', { autoAlpha: 0, y: 18 });
      gsap.set(['.hd-1', '.hd-2', '.hd-3', '.hd-4', '.hd-5'], { autoAlpha: 0, y: 16 });
      gsap.set('.db', { autoAlpha: 0, scale: 0.6, x: 420, transformOrigin: '50% 50%' });
      gsap.set('.hchip', { autoAlpha: 0, y: 14, scale: 0.92 });
      gsap.set('.hcard', { autoAlpha: 0, y: 24 });
      gsap.set('.hc-line', { strokeDashoffset: 1 });
      gsap.set('.chip', { autoAlpha: 0, scale: 0.8 });
      gsap.set('.tw-wrap', { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 50%' });
      gsap.set('.card-wrap', { autoAlpha: 0, transformOrigin: '0 0' });
      gsap.set('.ph-wrap', { autoAlpha: 0, x: 460, transformOrigin: '50% 50%' });
      gsap.set('.ph-card', { autoAlpha: 0 });
      gsap.set(['.scr-live', '.scr-nutri', '.ws-rest', '.ws-pulse', '.live-left', '.plate-wrap', '.chart-wrap', '.pulse-global'], {
        autoAlpha: 0,
      });
      gsap.set('.ing', { autoAlpha: 0, y: -90, scale: 0.6, transformOrigin: '50% 50%' });
      gsap.set('.pc-point', { scale: 0, autoAlpha: 0 });
      gsap.set('.pc-area', { autoAlpha: 0 });
      gsap.set('.pc-line', { strokeDashoffset: 1 });

      // ---------- introdução (por tempo, não por scroll) ----------
      // 0–0.4 s cabeçalho (CSS) · 0.4–0.9 título · 0.9–1.5 haltere · 1.2–2.0 interface · 1.6–2.4 dados
      const intro = gsap.timeline({ delay: 0.05, defaults: { ease: 'power3.out' } });
      intro
        .to('.hl-path', { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, 0)
        .to('.hero-intro > *', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.4)
        .to('.db', { autoAlpha: 1, scale: 1.02, x: 320, duration: 0.7 }, 0.9)
        .to('.hcard', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.2)
        .to('.hc-line', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 1.6)
        .to('.hchip', { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.12 }, 1.6);

      // ---------- linha temporal principal ----------
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const T = (target: gsap.TweenTarget, vars: gsap.TweenVars, at: number, dur: number) =>
        tl.to(target, { ...vars, duration: dur }, at);

      // A. Do pulso ao movimento (0.00 – 0.18)
      T('.hero-block', { autoAlpha: 0, y: -40 }, 0, 0.05);
      T('.hchip, .hcard', { autoAlpha: 0, y: -20 }, 0, 0.04);
      T(dumbbell.current, { idle: 0 }, 0, 0.03);
      T('.hl', { opacity: 0.12 }, 0, 0.06);
      T('.db', { autoAlpha: 1, x: 0, scale: 1 }, 0.0, 0.07);
      T('.hd-1', { autoAlpha: 1, y: 0 }, 0.05, 0.04);
      T(dumbbell.current, { rotY: Math.PI * 1.4, rotX: 0.12, rotZ: 0.05, trail: 1 }, 0.02, 0.16);
      chips.forEach((_, i) => T(`.chip-${i}`, { autoAlpha: 1, scale: 1 }, 0.1 + i * 0.012, 0.03));

      // B. Do movimento ao cartão de treino (0.18 – 0.30)
      T('.hd-1', { autoAlpha: 0, y: -12 }, 0.18, 0.025);
      T('.chip', { autoAlpha: 0, scale: 0.55 }, 0.19, 0.05);
      T('.tw-wrap', { autoAlpha: 1, scale: 1 }, 0.18, 0.06);
      T('.db', { x: -304, y: 8, scale: 0.14 }, 0.2, 0.07);
      T(dumbbell.current, { rotY: Math.PI * 1.9, trail: 0 }, 0.2, 0.07);
      T('.card-wrap', { autoAlpha: 1 }, 0.24, 0.03);
      tl.fromTo('.card-wrap .tc-stat', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.025, stagger: 0.006 }, 0.26);

      // C. Do treinador para o atleta (0.30 – 0.48)
      T('.hd-2', { autoAlpha: 1, y: 0 }, 0.3, 0.03);
      tl.to('.tw-assign', { scale: 0.92, duration: 0.01 }, 0.34).to('.tw-assign', { scale: 1, duration: 0.01 }, 0.35);
      T('.ph-wrap', { autoAlpha: 1, x: 0, ease: 'power2.out' }, 0.34, 0.08);
      T('.tw-wrap', { scale: 0.9, x: -30, opacity: 0.35 }, 0.37, 0.09);
      T('.card-wrap', { scale: 1.06, rotation: -3, y: -12 }, 0.36, 0.02);
      tl.to('.card-wrap', { x: 635, y: -145, scale: 0.6, rotation: 0, ease: 'power2.inOut', duration: 0.09 }, 0.38);
      T('.db', { y: 8 - 12, scale: 0.15 }, 0.36, 0.02);
      tl.to('.db', { x: -304 + 616, y: 8 - 164, scale: 0.084, ease: 'power2.inOut', duration: 0.09 }, 0.38);
      T('.card-wrap', { autoAlpha: 0 }, 0.47, 0.006);
      T('.ph-card', { autoAlpha: 1 }, 0.47, 0.006);
      T('.db', { autoAlpha: 0 }, 0.474, 0.006);
      T('.hd-2', { autoAlpha: 0, y: -12 }, 0.485, 0.02);

      // D. Início do treino (0.50 – 0.68)
      T('.tw-wrap', { autoAlpha: 0 }, 0.49, 0.03);
      T('.ph-wrap', { scale: 1.07 }, 0.5, 0.04);
      T('.hd-3', { autoAlpha: 1, y: 0 }, 0.5, 0.03);
      T('.live-left', { autoAlpha: 1 }, 0.52, 0.03);
      tl.to('.ph-start', { scale: 0.93, duration: 0.01 }, 0.55).to('.ph-start', { scale: 1, duration: 0.01 }, 0.56);
      T('.scr-today', { autoAlpha: 0 }, 0.565, 0.02);
      T('.scr-live', { autoAlpha: 1 }, 0.565, 0.02);

      const clock = { t: 0, reps: 0, rest: 90 };
      const setTxt = (sel: string, v: string) => $(sel).forEach((n) => (n.textContent = v));
      tl.to(clock, {
        t: 38,
        duration: 0.11,
        onUpdate: () => setTxt('.ws-timer, .ll-timer', mmss(clock.t)),
      }, 0.57);
      tl.to(clock, {
        reps: 12,
        duration: 0.05,
        onUpdate: () => setTxt('.ws-reps, .ll-reps', String(Math.round(clock.reps))),
      }, 0.58);
      // série concluída
      tl.to('.ws-check1', { backgroundColor: '#f97316', borderColor: '#f97316', duration: 0.012 }, 0.635);
      tl.to('.ws-check1 .ws-tick', { opacity: 1, duration: 0.012 }, 0.635);
      tl.to('.ws-row1', { backgroundColor: 'rgba(249,115,22,0.14)', duration: 0.012 }, 0.635);
      // pulso laranja: do cartão da série para o indicador de progresso
      const row1 = one('.ws-row1');
      const bar = one('.ws-progress')?.parentElement;
      const pulsePath = () => ({
        sx: row1.offsetLeft + row1.offsetWidth - 30,
        sy: row1.offsetTop + row1.offsetHeight / 2 - 8,
        ex: (bar?.offsetLeft ?? 14) + 8,
        ey: (bar?.offsetTop ?? 440) + 4 - 8,
      });
      tl.fromTo(
        '.ws-pulse',
        { autoAlpha: 1, x: () => pulsePath().sx, y: () => pulsePath().sy, scale: 1.2 },
        { x: () => pulsePath().ex, y: () => pulsePath().ey, scale: 0.8, duration: 0.03, ease: 'power2.inOut', immediateRender: false },
        0.642,
      );
      tl.to('.ws-progress', { width: '33.3%', duration: 0.014 }, 0.668);
      tl.to('.ws-pulse', { autoAlpha: 0, duration: 0.008 }, 0.676);
      setTxt('.ws-prog-label', '0/3');
      tl.call(() => setTxt('.ws-prog-label', '1/3'), undefined, 0.668);
      tl.to('.ws-rest', { autoAlpha: 1, duration: 0.012 }, 0.668);
      tl.to(clock, {
        rest: 60,
        duration: 0.012,
        onUpdate: () => setTxt('.ws-rest-time, .ll-rest', mmss(clock.rest)),
      }, 0.668);

      // E. Nutrição (0.70 – 0.84)
      T('.hd-3', { autoAlpha: 0, y: -12 }, 0.69, 0.02);
      T('.live-left', { autoAlpha: 0 }, 0.69, 0.02);
      T('.hd-4', { autoAlpha: 1, y: 0 }, 0.7, 0.03);
      T('.scr-live', { autoAlpha: 0 }, 0.715, 0.02);
      T('.scr-nutri', { autoAlpha: 1 }, 0.715, 0.02);
      T('.plate-wrap', { autoAlpha: 1 }, 0.71, 0.03);
      [1, 2, 3, 4].forEach((n, i) => {
        tl.to(`.ing-${n}`, { autoAlpha: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.03 }, 0.735 + i * 0.016);
      });
      const nu = { q: 0 };
      const ring = one('.nu-ring') as unknown as SVGCircleElement;
      const C = Number(ring?.getAttribute('data-c') ?? 327);
      tl.to(nu, {
        q: 1,
        duration: 0.08,
        onUpdate: () => {
          const m = copy.macros;
          setTxt('.nu-kcal', String(Math.round(m.kcal * nu.q)));
          setTxt('.nu-p', String(Math.round(m.p * nu.q)));
          setTxt('.nu-c', String(Math.round(m.c * nu.q)));
          setTxt('.nu-f', String(Math.round(m.f * nu.q)));
          ring?.setAttribute('stroke-dashoffset', String(C * (1 - 0.78 * nu.q)));
          (['p', 'c', 'f'] as const).forEach((k) => {
            const b = one(`.nu-bar-${k}`);
            if (b) b.style.width = `${Math.min(100, ((m[k] * nu.q) / Number(b.dataset.max)) * 100)}%`;
          });
        },
      }, 0.73);
      T('.hd-4', { autoAlpha: 0, y: -12 }, 0.83, 0.02);
      T('.plate-wrap', { autoAlpha: 0 }, 0.82, 0.03);

      // F. Progresso (0.84 – 1.00)
      T('.hd-5', { autoAlpha: 1, y: 0 }, 0.84, 0.03);
      T('.ph-wrap', { scale: 0.86 }, 0.84, 0.04);
      T('.chart-wrap', { autoAlpha: 1 }, 0.85, 0.03);
      const firstPoint = () => {
        const p = one('.pc-point circle');
        const sr = stage.current!.getBoundingClientRect();
        const r = p.getBoundingClientRect();
        const s = scaleRef.current;
        return { x: (r.left + r.width / 2 - sr.left) / s - 8, y: (r.top + r.height / 2 - sr.top) / s - 8 };
      };
      tl.fromTo(
        '.pulse-global',
        { autoAlpha: 1, x: 1042, y: 265 },
        { x: () => firstPoint().x, y: () => firstPoint().y, duration: 0.035, ease: 'power2.inOut', immediateRender: false },
        0.862,
      );
      tl.to('.pulse-global', { autoAlpha: 0, duration: 0.008 }, 0.897);
      const line = one('.pc-line') as unknown as SVGPathElement;
      const len = line.getTotalLength();
      const traveler = one('.pc-traveler');
      const n = copy.load.length;
      const pr = { p: 0 };
      tl.to(pr, {
        p: 1,
        duration: 0.09,
        onUpdate: () => {
          gsap.set('.pc-line', { strokeDashoffset: 1 - pr.p });
          gsap.set('.pc-area', { autoAlpha: pr.p });
          const pt = line.getPointAtLength(pr.p * len);
          traveler?.setAttribute('transform', `translate(${pt.x},${pt.y})`);
          traveler?.setAttribute('opacity', pr.p > 0.005 && pr.p < 0.995 ? '1' : '0');
          $('.pc-point').forEach((el, i) => {
            const on = pr.p >= i / (n - 1) - 0.001;
            gsap.set(el, { scale: on ? 1 : 0, autoAlpha: on ? 1 : 0 });
          });
        },
      }, 0.88);

      tl.set({}, {}, 1); // fixa a duração em 1: o estado final fica parado até ao fim do scroll

      // ---------- ligação ao scroll ----------
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => setDbOn(self.progress < 0.5),
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" aria-label="FitGram — cada repetição conta uma história" className="relative bg-background" style={{ height: '820vh' }}>
      <div className="sticky-view sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 text-foreground"
          style={{ width: DESIGN_W, height: DESIGN_H, marginLeft: -DESIGN_W / 2, marginTop: -DESIGN_H / 2, transformOrigin: 'center' }}
        >
          <HeroLine />

          {/* Hero */}
          <div className="hero-block absolute inset-0">
            <div className="hero-intro absolute left-[80px] top-[170px] w-[600px] text-left [text-shadow:0_2px_24px_hsl(var(--background)/0.9)]">
              <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary" aria-hidden />
                {copy.hero.eyebrow}
              </p>
              <h1 className="mt-5 text-[66px] font-extrabold leading-[1.02] tracking-tight">{copy.hero.headline}</h1>
              <p className="mt-5 max-w-[520px] text-[19px] leading-relaxed text-foreground/80">{copy.hero.sub}</p>
              <div className="mt-8 flex gap-3 [text-shadow:none]">
                <HeroCta />
                <TLink
                  to={links.explore}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/25 bg-background/40 px-7 text-[16px] font-semibold text-foreground backdrop-blur transition-[background-color,transform] duration-150 hover:bg-foreground/10 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  <DumbbellIcon className="size-5" aria-hidden />
                  {copy.hero.secondary}
                </TLink>
              </div>
            </div>

            {/* Dados de treino em volta do haltere (valores de exemplo) */}
            {[
              { l: 'Carga', v: '24 kg', x: 760, y: 150 },
              { l: 'Séries × repetições', v: '3 × 12', x: 1010, y: 214 },
              { l: 'RPE', v: '8', x: 1068, y: 392 },
            ].map((c) => (
              <div key={c.l} className="hchip absolute rounded-xl border border-border bg-card/90 px-4 py-2.5 shadow-card backdrop-blur" style={{ left: c.x, top: c.y }}>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.l}</p>
                <p className="text-[18px] font-bold tabular-nums">{c.v}</p>
              </div>
            ))}
            <div className="hcard absolute left-[760px] top-[486px] w-[420px] rounded-2xl border border-border bg-card/90 px-5 py-4 shadow-card backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Evolução da carga</p>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{copy.demoTag}</span>
              </div>
              <svg viewBox="0 0 380 70" className="mt-2 h-[70px] w-full" aria-hidden>
                <path className="hc-line" pathLength={1} strokeDasharray={1} d="M4,58 L60,54 L120,48 L170,50 L230,36 L290,28 L340,16 L376,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <Heading cls="hd-1" title={copy.movement.title} sub={copy.movement.sub} center />
          <Heading cls="hd-2" title={copy.coach.title} sub={copy.coach.sub} />
          <Heading cls="hd-3" title={copy.live.title} sub={copy.live.sub} />
          <Heading cls="hd-4" title={copy.nutrition.title} sub={copy.nutrition.sub} />
          <Heading cls="hd-5" title={copy.progress.title} sub={copy.progress.sub} />

          {/* Janela do treinador + cartão */}
          <div className="tw-wrap absolute left-[90px] top-[170px]">
            <TrainerWindow />
          </div>
          <div className="card-wrap absolute left-[288px] top-[290px]">
            <TrainingCard />
          </div>

          {/* Haltere 3D */}
          <div className="db absolute left-[340px] top-[150px] h-[360px] w-[600px]">
            {webgl ? (
              live && dbOn && (
                <Suspense fallback={null}>
                  <Dumbbell3D state={dumbbell} />
                </Suspense>
              )
            ) : (
              <Dumbbell2D className="h-full w-full" />
            )}
          </div>
          {chips.map((c, i) => (
            <div
              key={c.label}
              className={`chip chip-${i} absolute rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur`}
              style={{ left: c.x, top: c.y }}
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.label}</p>
              <p className="text-[16px] font-bold">{c.value}</p>
            </div>
          ))}

          {/* Telemóvel */}
          <div className="ph-wrap absolute left-[900px] top-[70px]">
            <Phone />
          </div>

          {/* Leituras grandes à esquerda durante o treino */}
          <div className="live-left absolute left-[80px] top-[200px] w-[480px]">
            <p className="text-[12px] uppercase tracking-widest text-muted-foreground">Tempo de treino</p>
            <p className="ll-timer text-[96px] font-extrabold leading-none tabular-nums">00:00</p>
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-[12px] uppercase tracking-widest text-muted-foreground">Repetições</p>
                <p className="text-[56px] font-extrabold leading-none tabular-nums">
                  <span className="ll-reps">0</span>
                  <span className="text-[24px] text-muted-foreground"> / 12</span>
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-widest text-muted-foreground">Descanso</p>
                <p className="ll-rest text-[56px] font-extrabold leading-none tabular-nums">01:30</p>
              </div>
            </div>
            <p className="mt-8 text-[12px] text-muted-foreground">{copy.demoTag} — não são dados reais.</p>
          </div>

          <div className="plate-wrap absolute left-[150px] top-[260px]">
            <NutritionPlate />
            <p className="mt-3 text-[12px] text-muted-foreground">{copy.demoTag}: valores de uma refeição de exemplo.</p>
          </div>

          <div className="chart-wrap absolute left-[80px] top-[190px]">
            <ProgressChart />
          </div>

          <span className="pulse-global pointer-events-none absolute left-0 top-0 size-4 rounded-full bg-primary shadow-[0_0_24px_6px_rgba(249,115,22,0.7)]" />
        </div>
      </div>
    </section>
  );
}

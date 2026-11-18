import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowRight, Dumbbell as DumbbellIcon } from 'lucide-react';
import { TLink } from '@/lib/nav';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { links } from '@/lib/links';
import { demo } from './copy';
import { useT } from '@/i18n';
import { HeroLine } from './HeroLine';
import { Dumbbell2D } from './Dumbbell2D';
import { initialDumbbell, type DumbbellState } from './dumbbellState';
import { TrainerWindow } from './TrainerWindow';
import { TrainingCard } from './TrainingCard';
import { Phone } from './Phone';
import { NutritionPlate } from './NutritionPlate';
import { ProgressChart } from './ProgressChart';

const Dumbbell3D = lazy(() => import('./Dumbbell3D'));

/** Espaço de design: horizontal (desktop) 1280×720 · vertical (telemóvel) 400×760. */
const SIZE = { desktop: { w: 1280, h: 720 }, mobile: { w: 400, h: 760 } } as const;

/** Posições-chave da linha temporal. A narrativa é a mesma; só a geometria muda entre layouts. */
const LAYOUT = {
  desktop: {
    dbFrom: { x: 420, y: 0, scale: 0.6 },
    dbHero: { x: 320, y: 0, scale: 1.02 },
    dbMain: { x: 0, y: 0, scale: 1 },
    dbCard: { x: -304, y: 8, scale: 0.14 },
    dbPop: { y: -4, scale: 0.15 },
    dbPhone: { x: 312, y: -156, scale: 0.084 },
    twK: 1,
    cardK: 1,
    flight: { x: 635, y: -145 },
    phFrom: 460,
    phLive: 1.07,
    phNutri: null,
    phProgress: { scale: 0.86 },
    pulse0: { x: 1042, y: 265 },
  },
  mobile: {
    dbFrom: { x: 0, y: 150, scale: 0.6 },
    dbHero: { x: 0, y: 80, scale: 0.95 },
    dbMain: { x: 0, y: 0, scale: 1 },
    dbCard: { x: -44, y: -84, scale: 0.1 },
    dbPop: { y: -92, scale: 0.105 },
    dbPhone: { x: -98, y: -141, scale: 0.055 },
    twK: 0.6,
    cardK: 0.6,
    flight: { x: -54, y: -57 },
    phFrom: 420,
    phLive: 1.04,
    phNutri: { scale: 0.62, y: 112 },
    phProgress: null,
    pulse0: { x: 184, y: 552 },
  },
} as const;

/** Posições dos dados do treino em volta do haltere (desktop x/y, telemóvel mx/my); o texto vem do dicionário. */
const CHIP_POS = [
  { x: 330, y: 190, mx: 16, my: 128 },
  { x: 720, y: 196, mx: 284, my: 128 },
  { x: 262, y: 330, mx: 16, my: 556 },
  { x: 796, y: 334, mx: 270, my: 556 },
  { x: 340, y: 470, mx: 16, my: 620 },
  { x: 728, y: 472, mx: 300, my: 620 },
] as const;

/** Etiquetas de macros à volta do prato (desktop): cor e posição local ao prato. */
const MACRO_CHIPS = [
  { color: '#38bdf8', x: -96, y: 60 },
  { color: '#a3e635', x: 340, y: 40 },
  { color: '#4ade80', x: 350, y: 230 },
  { color: '#fbbf24', x: -100, y: 250 },
] as const;
/** Centro do anel de calorias do telemóvel, em coordenadas do prato (desktop). */
const RING_TARGET = { x: 900, y: -10 };
/** Meia largura / meia altura aproximadas de uma etiqueta, para o centro dela acertar no anel. */
const CHIP_HALF = { w: 70, h: 18 };

const mmss = (s: number) => {
  const v = Math.max(0, Math.round(s));
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
};

function Heading({ cls, title, sub, center = false, mobile = false }: { cls: string; title: string; sub: string; center?: boolean; mobile?: boolean }) {
  if (mobile) {
    return (
      <div className={`${cls} absolute left-[22px] top-[14px] w-[356px]`}>
        <h2 className="text-[27px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
        <p className="mt-1.5 text-[14px] leading-snug text-muted-foreground">{sub}</p>
      </div>
    );
  }
  return (
    <div className={`${cls} absolute ${center ? 'left-[240px] top-[36px] w-[800px] text-center' : 'left-[80px] top-[36px] w-[580px]'}`}>
      <h2 className="text-[38px] font-extrabold leading-[1.08] tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-[15px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function HeroCta({ mobile = false }: { mobile?: boolean }) {
  const t = useT();
  return (
    // «Começar agora» → «Tenho interesse» enquanto o registo está escondido.
    <TLink
      to={links.interest(t.getApp.interestSubject)}
      className={`${mobile ? 'w-full justify-center ' : ''}inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-[16px] font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground`}
    >
      {t.getApp.interested}
      <ArrowRight className="size-5" aria-hidden />
    </TLink>
  );
}

/** Versão fixa (desktop e telemóvel): uma única linha temporal GSAP controlada pelo scroll. */
export function CinematicStory({ webgl, mobile = false }: { webgl: boolean; mobile?: boolean }) {
  const P = LAYOUT[mobile ? 'mobile' : 'desktop'];
  const t = useT();
  const S = t.story;
  const chips = [
    { label: S.stats.exercise, value: S.exercise.name },
    { label: S.stats.sets, value: '3' },
    { label: S.stats.reps, value: '12' },
    { label: S.stats.load, value: '24 kg' },
    { label: S.stats.rest, value: '90 s' },
    { label: S.stats.rpe, value: '8' },
  ].map((c, i) => ({ ...c, ...CHIP_POS[i] }));
  // «Treina melhor. Evolui sempre.» → a segunda frase recebe o brilho.
  const cut = S.hero.headline.indexOf('. ');
  const headA = cut > 0 ? S.hero.headline.slice(0, cut + 1) : S.hero.headline;
  const headB = cut > 0 ? S.hero.headline.slice(cut + 2) : '';
  const onPointer = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const el = root.current;
    if (!el) return;
    el.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
  };
  const mc = S.macroChips;
  const macroChips = [
    { label: mc.protein, value: `${demo.macros.p} g` },
    { label: mc.carbs, value: `${demo.macros.c} g` },
    { label: mc.veg, value: mc.fiber },
    { label: mc.fat, value: `${demo.macros.f} g` },
  ].map((c, i) => ({ ...c, ...MACRO_CHIPS[i] }));
  const { w: DESIGN_W, h: DESIGN_H } = SIZE[mobile ? 'mobile' : 'desktop'];
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heroBg = useRef<HTMLDivElement>(null);
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
      gsap.set('.db', { autoAlpha: 0, ...P.dbFrom, transformOrigin: '50% 50%' });
      gsap.set('.hchip', { autoAlpha: 0, y: 14, scale: 0.92 });
      gsap.set('.hcard', { autoAlpha: 0, y: 24 });
      gsap.set('.hc-line', { strokeDashoffset: 1 });
      gsap.set('.chip', { autoAlpha: 0, scale: 0.8 });
      gsap.set('.tw-wrap', { autoAlpha: 0, scale: 0.94 * P.twK, transformOrigin: '50% 50%' });
      gsap.set('.card-wrap', { autoAlpha: 0, scale: P.cardK, transformOrigin: '0 0' });
      gsap.set('.ph-wrap', { autoAlpha: 0, x: P.phFrom, transformOrigin: '50% 50%' });
      gsap.set('.ph-card', { autoAlpha: 0 });
      gsap.set(['.scr-live', '.scr-nutri', '.ws-rest', '.ws-pulse', '.live-left', '.plate-wrap', '.chart-wrap', '.pulse-global'], {
        autoAlpha: 0,
      });
      gsap.set('.ing', { autoAlpha: 0, y: -120, scale: 0.5, rotation: -30, transformOrigin: '50% 50%' });
      gsap.set('.np-burst', { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set('.np-steam-g', { autoAlpha: 0 });
      gsap.set('.np-glow', { autoAlpha: 0 });
      gsap.set('.np-disc', { scale: 0.7, rotation: -40, transformOrigin: '50% 50%' });
      gsap.set('.mchip', { autoAlpha: 0, scale: 0.4, x: 0, y: 0 });
      gsap.set('.pc-point', { scale: 0, autoAlpha: 0 });
      gsap.set('.pc-area', { autoAlpha: 0 });
      gsap.set('.pc-line', { strokeDashoffset: 1 });

      // ---------- introdução (por tempo, não por scroll) ----------
      // 0–0.4 s cabeçalho (CSS) · 0.4–0.9 título · 0.9–1.5 haltere · 1.2–2.0 interface · 1.6–2.4 dados
      const intro = gsap.timeline({ delay: 0.05, defaults: { ease: 'power3.out' } });
      intro
        .to('.hl-path', { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, 0)
        .to('.hero-intro > *', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.4)
        .to('.db', { autoAlpha: 1, ...P.dbHero, duration: 0.7 }, 0.9)
        .to('.hcard', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.2)
        .to('.hc-line', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 1.6)
        .to('.hchip', { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.12 }, 1.6);

      // ---------- linha temporal principal ----------
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const T = (target: gsap.TweenTarget, vars: gsap.TweenVars, at: number, dur: number) =>
        tl.to(target, { ...vars, duration: dur }, at);

      // A. Do pulso ao movimento (0.00 – 0.18)
      T('.hero-block', { autoAlpha: 0, y: -40 }, 0, 0.05);
      if (heroBg.current) tl.fromTo(heroBg.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.06, immediateRender: false }, 0);
      // fromTo: ao voltar ao topo, os dados e o haltere regressam (antes ficavam escondidos).
      tl.fromTo('.hchip, .hcard', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, duration: 0.04, immediateRender: false }, 0);
      T(dumbbell.current, { idle: 0 }, 0, 0.03);
      T('.hl', { opacity: 0.12 }, 0, 0.06);
      tl.fromTo('.db', { autoAlpha: 1, ...P.dbHero }, { autoAlpha: 1, ...P.dbMain, duration: 0.07, immediateRender: false }, 0);
      T('.hd-1', { autoAlpha: 1, y: 0 }, 0.05, 0.04);
      T(dumbbell.current, { rotY: Math.PI * 1.4, rotX: 0.12, rotZ: 0.05, trail: 1 }, 0.02, 0.16);
      CHIP_POS.forEach((_, i) => T(`.chip-${i}`, { autoAlpha: 1, scale: 1 }, 0.1 + i * 0.012, 0.03));

      // B. Do movimento ao cartão de treino (0.18 – 0.30)
      T('.hd-1', { autoAlpha: 0, y: -12 }, 0.18, 0.025);
      T('.chip', { autoAlpha: 0, scale: 0.55 }, 0.19, 0.05);
      T('.tw-wrap', { autoAlpha: 1, scale: P.twK }, 0.18, 0.06);
      T('.db', { ...P.dbCard }, 0.2, 0.07);
      T(dumbbell.current, { rotY: Math.PI * 1.9, trail: 0 }, 0.2, 0.07);
      T('.card-wrap', { autoAlpha: 1 }, 0.24, 0.03);
      tl.fromTo('.card-wrap .tc-stat', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.025, stagger: 0.006 }, 0.26);

      // C. Do treinador para o atleta (0.30 – 0.48)
      T('.hd-2', { autoAlpha: 1, y: 0 }, 0.3, 0.03);
      tl.to('.tw-assign', { scale: 0.92, duration: 0.01 }, 0.34).to('.tw-assign', { scale: 1, duration: 0.01 }, 0.35);
      T('.ph-wrap', { autoAlpha: 1, x: 0, ease: 'power2.out' }, 0.34, 0.08);
      T('.tw-wrap', { scale: 0.9 * P.twK, x: -30 * P.twK, opacity: 0.35 }, 0.37, 0.09);
      T('.card-wrap', { scale: 1.06 * P.cardK, rotation: -3, y: -12 }, 0.36, 0.02);
      tl.to('.card-wrap', { x: P.flight.x, y: P.flight.y, scale: 0.6, rotation: 0, ease: 'power2.inOut', duration: 0.09 }, 0.38);
      T('.db', { ...P.dbPop }, 0.36, 0.02);
      tl.to('.db', { ...P.dbPhone, ease: 'power2.inOut', duration: 0.09 }, 0.38);
      T('.card-wrap', { autoAlpha: 0 }, 0.47, 0.006);
      T('.ph-card', { autoAlpha: 1 }, 0.47, 0.006);
      T('.db', { autoAlpha: 0 }, 0.474, 0.006);
      T('.hd-2', { autoAlpha: 0, y: -12 }, 0.485, 0.02);

      // D. Início do treino (0.50 – 0.68)
      T('.tw-wrap', { autoAlpha: 0 }, 0.49, 0.03);
      T('.ph-wrap', { scale: P.phLive }, 0.5, 0.04);
      T('.hd-3', { autoAlpha: 1, y: 0 }, 0.5, 0.03);
      if (!mobile) T('.live-left', { autoAlpha: 1 }, 0.52, 0.03);
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
      if (!mobile) T('.live-left', { autoAlpha: 0 }, 0.69, 0.02);
      if (P.phNutri) T('.ph-wrap', { ...P.phNutri }, 0.69, 0.03);
      T('.hd-4', { autoAlpha: 1, y: 0 }, 0.7, 0.03);
      T('.scr-live', { autoAlpha: 0 }, 0.715, 0.02);
      T('.scr-nutri', { autoAlpha: 1 }, 0.715, 0.02);
      T('.plate-wrap', { autoAlpha: 1 }, 0.71, 0.03);
      tl.to('.np-disc', { scale: 1, rotation: 0, ease: 'power3.out', duration: 0.035 }, 0.705);
      T('.np-glow', { autoAlpha: 1 }, 0.72, 0.03);
      [1, 2, 3, 4].forEach((n, i) => {
        const at = 0.735 + i * 0.014;
        tl.to(`.ing-${n}`, { autoAlpha: 1, y: 0, scale: 1, rotation: 0, ease: 'back.out(2.2)', duration: 0.03 }, at);
        // faíscas no momento do impacto
        tl.fromTo(`.np-burst-${n}`, { autoAlpha: 1, scale: 0.4 }, { autoAlpha: 0, scale: 1.5, ease: 'power2.out', duration: 0.018, immediateRender: false }, at + 0.022);
        // a etiqueta de macros salta do alimento
        tl.to(`.mchip-${n}`, { autoAlpha: 1, scale: 1, ease: 'back.out(2)', duration: 0.02 }, at + 0.024);
      });
      T('.np-steam-g', { autoAlpha: 1 }, 0.79, 0.02);
      // as etiquetas voam para o anel de calorias do telemóvel
      if (!mobile) {
        MACRO_CHIPS.forEach((c, i) => {
          tl.to(`.mchip-${i + 1}`, { x: RING_TARGET.x - c.x - CHIP_HALF.w, y: RING_TARGET.y - c.y - CHIP_HALF.h, scale: 0.25, autoAlpha: 0, ease: 'power2.in', duration: 0.03 }, 0.795 + i * 0.006);
        });
        tl.fromTo('.nu-ring-glow', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1.15, duration: 0.012, immediateRender: false }, 0.815);
        tl.to('.nu-ring-glow', { autoAlpha: 0, scale: 1.3, duration: 0.012 }, 0.827);
      }
      const nu = { q: 0 };
      const ring = one('.nu-ring') as unknown as SVGCircleElement;
      const C = Number(ring?.getAttribute('data-c') ?? 327);
      tl.to(nu, {
        q: 1,
        duration: 0.08,
        onUpdate: () => {
          const m = demo.macros;
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
      if (P.phProgress) T('.ph-wrap', { ...P.phProgress }, 0.84, 0.04);
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
        { autoAlpha: 1, x: P.pulse0.x, y: P.pulse0.y },
        { x: () => firstPoint().x, y: () => firstPoint().y, duration: 0.035, ease: 'power2.inOut', immediateRender: false },
        0.862,
      );
      tl.to('.pulse-global', { autoAlpha: 0, duration: 0.008 }, 0.897);
      const line = one('.pc-line') as unknown as SVGPathElement;
      const len = line.getTotalLength();
      const traveler = one('.pc-traveler');
      const n = demo.load.length;
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
  }, [P, mobile]);

  return (
    <section ref={root} id="top" aria-label={S.aria} onPointerMove={onPointer} className="relative bg-background" style={{ height: mobile ? '760svh' : '820vh' }}>
      <div className={`sticky-view sticky top-16 w-full overflow-hidden ${mobile ? 'h-[calc(100svh-4rem)]' : 'h-[calc(100vh-4rem)]'}`}>
        {/* Fundo do hero: grelha de pontos, brilhos suaves e vinheta (ecrã inteiro, atrás do palco). */}
        <div ref={heroBg} className="pointer-events-none absolute inset-0" aria-hidden>
          <div className={`hero-grid absolute inset-0 ${mobile ? 'hero-grid-m' : ''}`} />
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_74%_46%,rgba(249,115,22,0.13),transparent_70%),radial-gradient(40%_45%_at_8%_95%,rgba(251,146,60,0.07),transparent_70%)]" />
          <div className="absolute inset-0 hidden bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(0,0,0,0.55)_100%)] dark:block" />
        </div>
        <div
          ref={stage}
          className="absolute left-1/2 top-1/2 text-foreground"
          style={{ width: DESIGN_W, height: DESIGN_H, marginLeft: -DESIGN_W / 2, marginTop: -DESIGN_H / 2, transformOrigin: 'center' }}
        >
          <HeroLine mobile={mobile} />

          {/* Hero */}
          <div className="hero-block absolute inset-0">
            {/* aurora e faíscas atrás do haltere */}
            <div className={`pointer-events-none absolute ${mobile ? 'left-[-60px] top-[250px] size-[520px]' : 'left-[640px] top-[40px] size-[720px]'}`} aria-hidden>
              <div className="hero-aurora hero-aurora-1 absolute inset-[10%] rounded-full" />
              <div className="hero-aurora hero-aurora-2 absolute inset-[22%] rounded-full" />
              {Array.from({ length: 16 }, (_, i) => (
                <span
                  key={i}
                  className="hero-spark absolute bottom-[18%] size-1.5 rounded-full bg-primary"
                  style={{ left: `${12 + ((i * 53) % 76)}%`, animationDelay: `${-(i * 0.45)}s`, animationDuration: `${3.2 + (i % 5) * 0.6}s` }}
                />
              ))}
            </div>
            <div
              className={`hero-intro absolute text-left [text-shadow:0_2px_24px_hsl(var(--background)/0.9)] ${
                mobile ? 'left-[22px] top-[10px] w-[356px]' : 'left-[80px] top-[170px] w-[600px]'
              }`}
            >
              <p className={`inline-flex items-center gap-2 font-bold uppercase text-primary ${mobile ? 'text-[11px] tracking-[0.16em]' : 'text-[13px] tracking-[0.2em]'}`}>
                <span className="h-px w-8 bg-primary" aria-hidden />
                {S.hero.eyebrow}
              </p>
              <h1 className={`font-extrabold tracking-tight ${mobile ? 'mt-3 text-[40px] leading-[1.04]' : 'mt-5 text-[66px] leading-[1.02]'}`}>
                {headA}
                {headB && (
                  <>
                    {' '}
                    <span className="hero-shine">{headB}</span>
                  </>
                )}
              </h1>
              <p className={`leading-relaxed text-foreground/80 ${mobile ? 'mt-3 text-[15px]' : 'mt-5 max-w-[520px] text-[19px]'}`}>{S.hero.sub}</p>
              <div className={`flex gap-3 [text-shadow:none] ${mobile ? 'mt-5 flex-col' : 'mt-8'}`}>
                <HeroCta mobile={mobile} />
                <TLink
                  to={links.explore}
                  className={`${mobile ? 'w-full justify-center ' : ''}inline-flex h-12 items-center gap-2 rounded-full border border-foreground/25 bg-background/40 px-7 text-[16px] font-semibold text-foreground backdrop-blur transition-[background-color,transform] duration-150 hover:bg-foreground/10 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground`}
                >
                  <DumbbellIcon className="size-5" aria-hidden />
                  {S.hero.secondary}
                </TLink>
              </div>
            </div>

            <div className="hero-par absolute inset-0">
            {/* Dados de treino em volta do haltere (valores de exemplo) */}
            {(mobile
              ? [
                  { l: S.stats.load, v: '24 kg', x: 22, y: 568 },
                  { l: S.stats.setsReps, v: '3 × 12', x: 120, y: 568 },
                  { l: S.stats.rpe, v: '8', x: 300, y: 568 },
                ]
              : [
                  { l: S.stats.load, v: '24 kg', x: 760, y: 150 },
                  { l: S.stats.setsReps, v: '3 × 12', x: 1010, y: 214 },
                  { l: S.stats.rpe, v: '8', x: 1068, y: 392 },
                ]
            ).map((c) => (
              <div key={c.l} className="hchip absolute rounded-xl border border-border bg-card/90 px-3.5 py-2 shadow-card backdrop-blur md:px-4 md:py-2.5" style={{ left: c.x, top: c.y }}>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.l}</p>
                <p className="text-[18px] font-bold tabular-nums">{c.v}</p>
              </div>
            ))}
            <div
              className={`hcard absolute rounded-2xl border border-border bg-card/90 px-5 py-3 shadow-card backdrop-blur ${
                mobile ? 'left-[20px] top-[650px] w-[360px]' : 'left-[760px] top-[486px] w-[420px] py-4'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">{S.loadEvolution}</p>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t.common.demoTag}</span>
              </div>
              <svg viewBox="0 0 380 70" preserveAspectRatio="none" className={`mt-2 w-full ${mobile ? 'h-[44px]' : 'h-[70px]'}`} aria-hidden>
                <path className="hc-line" pathLength={1} strokeDasharray={1} d="M4,58 L60,54 L120,48 L170,50 L230,36 L290,28 L340,16 L376,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            </div>
          </div>

          <Heading cls="hd-1" title={S.movement.title} sub={S.movement.sub} center mobile={mobile} />
          <Heading cls="hd-2" title={S.coach.title} sub={S.coach.sub} mobile={mobile} />
          <Heading cls="hd-3" title={S.live.title} sub={S.live.sub} mobile={mobile} />
          <Heading cls="hd-4" title={S.nutrition.title} sub={S.nutrition.sub} mobile={mobile} />
          <Heading cls="hd-5" title={S.progress.title} sub={S.progress.sub} mobile={mobile} />

          {/* Janela do treinador + cartão */}
          <div className={`tw-wrap absolute ${mobile ? 'left-[-120px] top-[112px]' : 'left-[90px] top-[170px]'}`}>
            <TrainerWindow />
          </div>
          <div className={`card-wrap absolute ${mobile ? 'left-[127px] top-[272px]' : 'left-[288px] top-[290px]'}`}>
            <TrainingCard />
          </div>

          {/* Haltere 3D */}
          <div className={`db absolute ${mobile ? 'left-0 top-[235px] h-[300px] w-[400px]' : 'left-[340px] top-[150px] h-[360px] w-[600px]'}`}>
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
              key={i}
              className={`chip chip-${i} absolute rounded-xl border border-border bg-card/80 px-3.5 py-2 backdrop-blur md:px-4 md:py-2.5`}
              style={{ left: mobile ? c.mx : c.x, top: mobile ? c.my : c.y }}
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.label}</p>
              <p className="text-[16px] font-bold">{c.value}</p>
            </div>
          ))}

          {/* Telemóvel */}
          <div className={`ph-wrap absolute ${mobile ? 'left-[50px] top-[140px]' : 'left-[900px] top-[70px]'}`}>
            <Phone />
          </div>

          {/* Leituras grandes à esquerda durante o treino */}
          <div className={`live-left absolute left-[80px] top-[200px] w-[480px] ${mobile ? 'hidden' : ''}`}>
            <p className="text-[12px] uppercase tracking-widest text-muted-foreground">{S.workoutTime}</p>
            <p className="ll-timer text-[96px] font-extrabold leading-none tabular-nums">00:00</p>
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-[12px] uppercase tracking-widest text-muted-foreground">{S.stats.reps}</p>
                <p className="text-[56px] font-extrabold leading-none tabular-nums">
                  <span className="ll-reps">0</span>
                  <span className="text-[24px] text-muted-foreground"> / 12</span>
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-widest text-muted-foreground">{S.stats.rest}</p>
                <p className="ll-rest text-[56px] font-extrabold leading-none tabular-nums">01:30</p>
              </div>
            </div>
            <p className="mt-8 text-[12px] text-muted-foreground">{t.common.demoTag} — {t.common.notRealData}.</p>
          </div>

          {mobile ? (
            <div className="plate-wrap absolute left-[94px] top-[124px] w-[212px]">
              <div className="h-[212px] w-[212px]">
                <div className="relative origin-top-left scale-[0.66]">
                  <div className="np-glow pointer-events-none absolute left-1/2 top-[165px] size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.35),transparent_65%)] blur-xl" aria-hidden />
                  <div className="np-disc relative">
                    <NutritionPlate />
                  </div>
                </div>
              </div>
              <p className="mt-1 text-center text-[11px] text-muted-foreground">{t.common.demoTag}</p>
            </div>
          ) : (
            <div className="plate-wrap absolute left-[150px] top-[260px]">
              <div className="np-glow pointer-events-none absolute left-1/2 top-[165px] size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.35),rgba(249,115,22,0.08)_45%,transparent_70%)] blur-xl" aria-hidden />
              <div className="np-disc relative">
                <NutritionPlate />
              </div>
              {macroChips.map((c, i) => (
                <div
                  key={i}
                  className={`mchip mchip-${i + 1} absolute flex items-center whitespace-nowrap gap-2.5 rounded-full border border-border bg-card/90 py-2 pl-2 pr-4 shadow-2xl backdrop-blur`}
                  style={{ left: c.x, top: c.y }}
                  aria-hidden
                >
                  <span className="size-3 rounded-full" style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }} />
                  <span className="text-[12px] text-muted-foreground">{c.label}</span>
                  <span className="text-[15px] font-extrabold tabular-nums">{c.value}</span>
                </div>
              ))}
              <p className="relative mt-3 text-[12px] text-muted-foreground">{t.common.demoTag}: {S.mealNote}.</p>
            </div>
          )}

          <div className={`chart-wrap absolute ${mobile ? 'left-[8px] top-[132px] origin-top-left scale-[0.52]' : 'left-[80px] top-[190px]'}`}>
            <ProgressChart />
          </div>

          <span className="pulse-global pointer-events-none absolute left-0 top-0 size-4 rounded-full bg-primary shadow-[0_0_24px_6px_rgba(249,115,22,0.7)]" />
        </div>
      </div>
    </section>
  );
}

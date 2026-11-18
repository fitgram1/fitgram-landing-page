import { useRef, type PointerEvent } from 'react';
import { ArrowRight, Trophy, Send, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { Parallax } from '@/components/Parallax';
import duo from '@/assets/fitgram-treinador-atleta.webp';
import { useT } from '@/i18n';

/** Posição e ícone dos cartões a flutuar (o texto vem do dicionário, pela mesma ordem). */
const CHIPS: { icon: LucideIcon; pos: string; delay: string }[] = [
  { icon: Send, pos: 'left-[-4%] top-[14%]', delay: '0s' },
  { icon: Trophy, pos: 'right-[-4%] bottom-[14%]', delay: '-2.4s' },
];

/** Para treinadores e atletas: imagem com inclinação 3D que segue o ponteiro. */
export function Duo() {
  const t = useT();
  const d = t.duo;
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = card.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="treinadores-e-atletas" aria-labelledby="duo-title" className="relative overflow-hidden py-20 md:py-28">
      <Parallax speed={-0.1} className="pointer-events-none absolute -left-40 top-10 size-[520px] rounded-full bg-amber-400/10 blur-3xl" />
      <Parallax speed={0.12} className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full bg-primary/15 blur-3xl" />

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden />
              {d.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="duo-title" className="mt-4 text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.03] tracking-tight">
              {d.titleA} <span className="duo-gradient-text">{d.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
              {d.lead}
            </p>
          </Reveal>

          <Reveal delay={260} from="left">
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#precos" size="lg" variant="outline">
                {t.nav.pricing}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal from="scale" delay={120}>
          <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
            {/* anel a rodar e brilho */}
            <div className="duo-ring pointer-events-none absolute inset-[6%] rounded-full" aria-hidden />
            <div className="pointer-events-none absolute inset-[16%] rounded-full bg-background" aria-hidden />
            <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.32),rgba(253,224,71,0.10)_45%,transparent_70%)] blur-2xl" aria-hidden />

            <div ref={card} className="duo-tilt relative h-full w-full">
              <div className="duo-float relative grid h-full w-full place-items-center">
                <img
                  src={duo}
                  alt={d.imageAlt}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-[80%] select-none rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(249,115,22,0.35)]"
                  draggable={false}
                />
                <div className="duo-glare pointer-events-none absolute inset-0 rounded-full" aria-hidden />
              </div>

              {CHIPS.map(({ icon: Icon, pos, delay }, i) => {
                const { title, sub } = d.chips[i === 0 ? 0 : 2];
                return (
                <div
                  key={i}
                  className={`duo-chip absolute ${pos} flex items-center gap-3 rounded-2xl border border-border bg-card/85 px-4 py-3 shadow-2xl backdrop-blur-md [transform:translateZ(60px)]`}
                  style={{ animationDelay: delay }}
                >
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-bold">{title}</p>
                    <p className="text-[11px] text-muted-foreground">{sub}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">{t.common.demoTag}</p>
        </Reveal>
      </div>
    </section>
  );
}

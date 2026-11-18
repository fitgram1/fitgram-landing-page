import { Reveal } from '@/components/Reveal';
import { useT } from '@/i18n';
import { sportScenes } from './chapter2Data';
import { SportBackdrop } from './SportBackdrop';

/** Versão vertical (telemóvel / movimento reduzido) do capítulo 2: modalidades, ciclo e final. */
export function Chapter2Stacked() {
  const t = useT();
  const c2 = t.chapter2;
  return (
    <div id="formatos" className="bg-background px-4 py-16 text-foreground">
      <span id="sec-modalidades" className="block" />
      <Reveal>
        <h2 className="mx-auto max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">{c2.sports.title}</h2>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-[520px] gap-3">
        {sportScenes.map((s, i) => {
          const sp = c2.sportItems[i];
          const Icon = s.icon;
          return (
            <Reveal key={s.key} delay={i * 50}>
              <div className="relative overflow-hidden rounded-3xl p-5 text-white" style={{ background: s.bg }}>
                <SportBackdrop kind={s.key} accent={s.accent} />
                <div className="relative">
                  <Icon className="size-6" style={{ color: s.accent }} aria-hidden />
                  <p className="mt-2 text-[34px] font-black uppercase leading-none tracking-tight">{sp.label}</p>
                  <p className="mt-1 text-[14px] text-white/80">{sp.tagline}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {sp.vars.map((v) => (
                      <div key={v.label} className="rounded-xl border border-white/15 bg-black/30 px-2.5 py-2 backdrop-blur">
                        <p className="text-[15px] font-extrabold">{v.value}</p>
                        <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: s.accent }}>
                          {v.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
        <p className="text-center text-[12px] text-muted-foreground">{t.common.demoTag}</p>
      </div>

      <span id="sec-ecossistema" className="block" />
      <Reveal>
        <h2 className="mx-auto mt-16 max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">{c2.eco.title}</h2>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-[520px] gap-3">
        {c2.ecosystem.map((e, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="rounded-2xl border border-primary/30 bg-card p-5 text-center">
              <p className="text-[22px] font-extrabold text-primary">{e.label}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{e.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  );
}

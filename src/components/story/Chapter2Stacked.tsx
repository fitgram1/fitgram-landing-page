import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { links } from '@/lib/links';
import { TLink } from '@/lib/nav';
import { formats, sports, ecosystem } from './chapter2Data';

/** Versão vertical (telemóvel / movimento reduzido) do capítulo 2. */
export function Chapter2Stacked() {
  return (
    <div id="formatos" className="bg-background px-4 py-16 text-foreground">
      <Reveal>
        <h2 className="mx-auto max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">Qualquer treino. Qualquer formato.</h2>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-[520px] gap-3">
        {formats.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.key} delay={i * 40}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <p className="font-bold">{f.label} · <span className="font-medium text-muted-foreground">{f.title}</span></p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {f.lines.map((l) => (
                    <div key={l.label} className="rounded-lg bg-foreground/[0.05] px-3 py-2">
                      <p className="text-[16px] font-extrabold">{l.value}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
        <p className="text-center text-[12px] text-muted-foreground">Exemplo ilustrativo</p>
      </div>

      <span id="sec-modalidades" className="block" />
      <Reveal>
        <h2 className="mx-auto mt-16 max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">Cada modalidade, as suas variáveis.</h2>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-[520px] grid-cols-2 gap-3">
        {sports.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.label} delay={i * 50}>
              <div className="h-full rounded-2xl border border-border bg-foreground/[0.03] p-4">
                <Icon className="size-6 text-primary" aria-hidden />
                <p className="mt-2 font-bold">{s.label}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{s.vars.join(' · ')}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <span id="sec-ecossistema" className="block" />
      <Reveal>
        <h2 className="mx-auto mt-16 max-w-[520px] text-center text-[30px] font-extrabold leading-[1.1] tracking-tight">Treino. Nutrição. Progresso.</h2>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-[520px] gap-3">
        {ecosystem.map((e, i) => (
          <Reveal key={e.label} delay={i * 80}>
            <div className="rounded-2xl border border-primary/30 bg-card p-5 text-center">
              <p className="text-[22px] font-extrabold text-primary">{e.label}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{e.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal from="scale">
        <div className="mx-auto mt-20 flex max-w-[520px] flex-col items-center text-center">
          <h2 className="text-[38px] font-extrabold leading-[1.05] tracking-tight">O próximo nível começa contigo.</h2>
          <TLink to={links.signup} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-bold">
            Criar conta
            <ArrowRight className="size-5" aria-hidden />
          </TLink>
        </div>
      </Reveal>
    </div>
  );
}

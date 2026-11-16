import { View } from 'react-native';
import { Apple, ArrowRight, Layers, LogIn, MonitorSmartphone, Play, Users, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { Parallax } from '@/components/Parallax';
import { appHost, links } from '@/lib/links';

interface Point {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** Só factos do produto (sem preços, que ainda não são públicos). */
const POINTS: Point[] = [
  { icon: Users, title: 'Para treinadores e atletas', body: 'O treinador cria os planos; o atleta treina, regista as sessões e envia os check-ins.' },
  { icon: Layers, title: 'Tudo num só sítio', body: 'Treino, nutrição, check-ins e progresso dos teus atletas.' },
  { icon: MonitorSmartphone, title: 'No computador e no telemóvel', body: `A mesma conta em ${appHost}, em qualquer ecrã.` },
];

/** Secção final da página inicial: levar a pessoa à app (web e, quando existirem, lojas). */
export function GetApp() {
  const stores = [
    links.appStore && { href: links.appStore, label: 'Descarregar na App Store', icon: Apple },
    links.playStore && { href: links.playStore, label: 'Disponível no Google Play', icon: Play },
  ].filter((s): s is { href: string; label: string; icon: LucideIcon } => !!s);

  return (
    <section id="comecar" className="py-16 md:py-24">
      <View className="container">
        <Reveal from="scale">
          <View className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.12] via-card to-card p-8 shadow-2xl shadow-primary/10 sm:p-12">
            <Parallax speed={-0.12} className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/25 blur-3xl" />
            <Parallax speed={0.1} className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
              <View className="lg:pr-6">
                <Reveal delay={100}>
                  <h2 className="text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.05] tracking-tight">
                    Começa hoje com o <span className="text-primary">FitGram.</span>
                  </h2>
                </Reveal>
                <View className="mt-5 h-1 w-12 rounded-full bg-primary" />
                <Reveal delay={200} from="left">
                  <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
                    Cria a tua conta em {appHost} e leva os treinos, a nutrição e o progresso dos teus atletas para uma única plataforma.
                  </p>
                </Reveal>
                <Reveal delay={300} from="left">
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={links.signup} size="lg" className="cta-shine">
                      Criar conta
                      <ArrowRight className="size-5" aria-hidden />
                    </ButtonLink>
                    <ButtonLink href={links.login} size="lg" variant="outline">
                      <LogIn className="size-4" aria-hidden />
                      Entrar
                    </ButtonLink>
                  </div>
                </Reveal>
                {stores.length > 0 && (
                  <Reveal delay={400} from="left">
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      {stores.map(({ href, label, icon: Icon }) => (
                        <ButtonLink key={href} href={href} size="lg" variant="outline" target="_blank" rel="noopener noreferrer">
                          <Icon className="size-4" aria-hidden />
                          {label}
                        </ButtonLink>
                      ))}
                    </div>
                  </Reveal>
                )}
              </View>

              <View className="lg:pl-6">
                {POINTS.map(({ icon: Icon, title, body }, i) => (
                  <Reveal key={title} delay={i * 110} from="right">
                    <View className={`flex flex-row items-center gap-5 py-5 ${i > 0 ? 'border-t border-border/70' : ''}`}>
                      <View className="grid size-14 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </View>
                      <View className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                      </View>
                    </View>
                  </Reveal>
                ))}
              </View>
            </div>
          </View>
        </Reveal>
      </View>
    </section>
  );
}

import { View } from 'react-native';
import { Apple, Instagram, Layers, Mail, MonitorSmartphone, Play, Users, type LucideIcon } from 'lucide-react';
// Para «Criar conta» / «Entrar» (escondidos por agora):
// import { ArrowRight, LogIn } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { Parallax } from '@/components/Parallax';
import { appHost, links } from '@/lib/links';
import { fmt, useT } from '@/i18n';

const POINT_ICONS: LucideIcon[] = [Users, Layers, MonitorSmartphone];

/** Secção final da página inicial: levar a pessoa à app (web e, quando existirem, lojas). */
export function GetApp() {
  const t = useT();
  const g = t.getApp;
  // «O próximo nível começa contigo.» — a última palavra fica a laranja.
  const fin = t.chapter2.final.title;
  const cut = fin.lastIndexOf(' ');
  const finA = fin.slice(0, cut);
  const finB = fin.slice(cut + 1);
  const stores = [
    links.appStore && { href: links.appStore, label: g.appStore, icon: Apple },
    links.playStore && { href: links.playStore, label: g.playStore, icon: Play },
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
                    {finA} <span className="text-primary">{finB}</span>
                  </h2>
                </Reveal>
                <View className="mt-5 h-1 w-12 rounded-full bg-primary" />
                <Reveal delay={200} from="left">
                  <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
                    {fmt(g.lead, { host: appHost })}
                  </p>
                </Reveal>
                <Reveal delay={300} from="left">
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {/* «Criar conta» e «Entrar» escondidos por agora (18/11).
                    <ButtonLink href={links.signup} size="lg" className="cta-shine">
                      {t.common.signup}
                      <ArrowRight className="size-5" aria-hidden />
                    </ButtonLink>
                    <ButtonLink href={links.login} size="lg" variant="outline">
                      <LogIn className="size-4" aria-hidden />
                      {t.common.login}
                    </ButtonLink>
                    */}
                    <ButtonLink
                      href={links.interest(g.interestSubject)}
                      size="lg"
                      className="cta-shine">
                      <Mail className="size-4" aria-hidden />
                      {g.interested}
                    </ButtonLink>
                    <ButtonLink href={links.instagram} size="lg" variant="outline" target="_blank" rel="noopener noreferrer">
                      <Instagram className="size-4" aria-hidden />
                      {g.instagram}
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
                {g.points.map(({ title, body }, i) => {
                  const Icon = POINT_ICONS[i];
                  return (
                  <Reveal key={title} delay={i * 110} from="right">
                    <View className={`flex flex-row items-center gap-5 py-5 ${i > 0 ? 'border-t border-border/70' : ''}`}>
                      <View className="grid size-14 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </View>
                      <View className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{fmt(body, { host: appHost })}</p>
                      </View>
                    </View>
                  </Reveal>
                  );
                })}
              </View>
            </div>
          </View>
        </Reveal>
      </View>
    </section>
  );
}

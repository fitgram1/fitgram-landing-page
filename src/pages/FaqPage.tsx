import { ArrowRight, Mail } from 'lucide-react';
import { Accordion } from '@/components/public/Accordion';
import { PublicPageLayout, PublicContainer } from '@/components/public/PublicPageLayout';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { PublicContentCard, PublicCTA } from '@/components/public/PublicParts';
import { ButtonLink } from '@/components/ui/button';
import { useI18n } from '@/i18n';
import { links } from '@/lib/links';

/**
 * Só existem 4 perguntas reais: não se justifica pesquisa nem categorias (seriam vazias).
 * Quando o conteúdo crescer, o Accordion aceita mais itens sem alterações.
 */
export function FaqPage() {
  const { t } = useI18n();
  const f = t.faqPage;
  return (
    <PublicPageLayout title={f.title} description={f.description}>
      <PublicPageHero eyebrow={f.title} title={<>{f.heroA} <span className="text-primary">FitGram.</span></>} lead={f.lead} />
      <section className="py-16 md:py-20">
        <PublicContainer>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
            <Accordion items={f.items} />
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <PublicContentCard>
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-bold tracking-tight">{f.stillQuestions}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.writeUs}</p>
                <ButtonLink href={links.contact} variant="outline" className="mt-5 w-full">
                  {f.talkToTeam}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </PublicContentCard>
            </aside>
          </div>
        </PublicContainer>
      </section>
      {/* Registo escondido por agora: «Tenho interesse» e Instagram em vez de «Criar conta» / «Entrar». */}
      <PublicCTA
        title={f.ctaTitle}
        body={f.ctaBody}
        to={links.interest(t.getApp.interestSubject)}
        label={t.getApp.interested}
        secondaryTo={links.instagram}
        secondaryLabel={t.getApp.instagram}
      />
    </PublicPageLayout>
  );
}

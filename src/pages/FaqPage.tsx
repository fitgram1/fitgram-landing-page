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
  return (
    <PublicPageLayout title="Perguntas frequentes" description="Tudo o que precisas de saber sobre o FitGram: onde o usar e como começar.">
      <PublicPageHero eyebrow="Perguntas frequentes" title={<>Tudo o que precisas de saber sobre o <span className="text-primary">FitGram.</span></>} lead="Respostas curtas e diretas. Se faltar alguma, escreve-nos." />
      <section className="py-16 md:py-20">
        <PublicContainer>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
            <Accordion items={t.faq.items} />
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <PublicContentCard>
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-bold tracking-tight">Ainda tens dúvidas?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">Escreve-nos. Respondemos pessoalmente.</p>
                <ButtonLink href={links.contact} variant="outline" className="mt-5 w-full">
                  Falar com a equipa
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </PublicContentCard>
            </aside>
          </div>
        </PublicContainer>
      </section>
      <PublicCTA title="Pronto para começar?" body="Cria a tua conta e leva os treinos, a nutrição e o progresso dos teus atletas para um só sítio." to={links.signup} label="Criar conta" secondaryTo={links.login} secondaryLabel="Entrar" />
    </PublicPageLayout>
  );
}

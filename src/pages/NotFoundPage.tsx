import { ArrowRight } from 'lucide-react';
import { PublicPageLayout, PublicContainer } from '@/components/public/PublicPageLayout';
import { ButtonLink } from '@/components/ui/button';
import { routes } from '@/lib/links';

export function NotFoundPage() {
  return (
    <PublicPageLayout title="Página não encontrada" description="Esta página não existe.">
      <PublicContainer className="py-28 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Erro 404</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight">Esta página não existe.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">O endereço pode ter mudado. Volta ao início para continuares a explorar o FitGram.</p>
        <ButtonLink href={routes.home} size="lg" className="mt-8">
          Voltar ao início
          <ArrowRight className="size-5" aria-hidden />
        </ButtonLink>
      </PublicContainer>
    </PublicPageLayout>
  );
}

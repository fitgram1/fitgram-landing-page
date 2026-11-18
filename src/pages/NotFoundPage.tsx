import { ArrowRight } from 'lucide-react';
import { PublicPageLayout, PublicContainer } from '@/components/public/PublicPageLayout';
import { ButtonLink } from '@/components/ui/button';
import { routes } from '@/lib/links';
import { useT } from '@/i18n';

export function NotFoundPage() {
  const n = useT().notFound;
  return (
    <PublicPageLayout title={n.title} description={n.description}>
      <PublicContainer className="py-28 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{n.eyebrow}</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,52px)] font-extrabold tracking-tight">{n.heading}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">{n.body}</p>
        <ButtonLink href={routes.home} size="lg" className="mt-8">
          {n.back}
          <ArrowRight className="size-5" aria-hidden />
        </ButtonLink>
      </PublicContainer>
    </PublicPageLayout>
  );
}

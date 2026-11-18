import { ArrowUp, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { PublicContainer } from '@/components/public/PublicPageLayout';
import { TLink } from '@/lib/nav';
import { links, routes } from '@/lib/links';
import { useT } from '@/i18n';

/** Rodapé único de todas as páginas públicas. Só contém destinos que existem. */
export function Footer() {
  const t = useT();
  const columns = [
    {
      title: t.footer.product,
      items: [
        { label: t.nav.features, to: links.explore },
        { label: t.nav.forTrainers, to: '/#treinadores' },
        { label: t.nav.forAthletes, to: '/#atletas' },
        { label: t.nav.sports, to: '/#modalidades' },
        { label: t.nav.pricing, to: '/#precos' },
      ],
    },
    {
      title: 'FitGram',
      items: [
        { label: t.nav.faq, to: routes.faq },
        { label: t.common.signup, to: links.signup },
        { label: t.common.login, to: links.login },
      ],
    },
  ];
  return (
    <footer className="site-footer relative mt-8 border-t border-border bg-card/50 pb-8 pt-14 text-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      <PublicContainer>
        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,4fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((x) => (
                  <li key={x.label}>
                    <TLink to={x.to} className="link-underline font-medium text-foreground outline-none transition-colors hover:text-primary focus-visible:text-primary">
                      {x.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{t.footer.contact}</p>
            <a href={links.contact} className="inline-flex items-center gap-2 font-medium text-foreground outline-none transition-colors hover:text-primary focus-visible:text-primary">
              <Mail className="size-4 text-primary" aria-hidden />
              fitgrampt@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
            <p>© 2026 FitGram.</p>
            <a href={links.privacy} className="link-underline outline-none transition-colors hover:text-primary focus-visible:text-primary">{t.footer.privacy}</a>
            <a href={links.terms} className="link-underline outline-none transition-colors hover:text-primary focus-visible:text-primary">{t.footer.terms}</a>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[13px] font-semibold outline-none transition-[border-color,color,transform] duration-150 hover:border-primary/50 hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95"
          >
            <ArrowUp className="size-4" aria-hidden />
            {t.footer.backToTop}
          </button>
        </div>
      </PublicContainer>
    </footer>
  );
}

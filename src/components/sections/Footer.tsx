import { Logo } from '@/components/Logo';
import { useI18n } from '@/i18n';

export function Footer() {
  const { t } = useI18n();
  const hrefs = ['#problem', '#solution', '#waitlist'];
  return (
    <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
      <div className="container">
        <Logo className="justify-center" />
        <p className="mt-3.5">{t.footer.tagline}</p>
        <div className="mt-3.5 flex justify-center gap-6">
          {t.footer.links.map((link, i) => (
            <a key={link} href={hrefs[i]} className="transition-colors hover:text-primary">
              {link}
            </a>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground/70">{t.footer.rights}</p>
      </div>
    </footer>
  );
}

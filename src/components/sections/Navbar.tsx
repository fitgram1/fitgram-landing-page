import { ButtonLink } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { useI18n } from '@/i18n';

export function Navbar() {
  const { t } = useI18n();
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md backdrop-saturate-150">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ButtonLink href="#waitlist" size="sm" className="hidden rounded-full sm:inline-flex">
            {t.nav.cta}
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}

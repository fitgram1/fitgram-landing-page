import { useI18n } from '@/i18n';
import { LOCALES } from '@/i18n/translations';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background p-0.5"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-bold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50',
            locale === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

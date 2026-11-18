import { useEffect, useId, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { useI18n } from '@/i18n';
import { LOCALES } from '@/i18n/translations';
import { cn } from '@/lib/utils';

/** Seletor de língua: botão com o código atual e lista com o nome de cada língua. */
export function LanguageSwitcher({ className, align = 'right' }: { className?: string; align?: 'left' | 'right' }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.common.language}: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 text-[13px] font-bold outline-none transition-[border-color,transform] duration-150 hover:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95"
      >
        <Globe className="size-4 text-primary" aria-hidden />
        {current.label}
      </button>
      <ul
        id={listId}
        role="listbox"
        aria-label={t.common.language}
        className={cn(
          'absolute top-[calc(100%+8px)] z-[70] w-48 origin-top rounded-2xl border border-border bg-card p-1.5 shadow-2xl transition-[opacity,transform,visibility] duration-200',
          align === 'right' ? 'right-0' : 'left-0',
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0',
        )}
      >
        {LOCALES.map(({ code, label, name }) => {
          const on = code === locale;
          return (
            <li key={code} role="option" aria-selected={on}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                lang={code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] outline-none transition-colors hover:bg-secondary focus-visible:bg-secondary',
                  on ? 'font-semibold text-foreground' : 'text-muted-foreground',
                )}
              >
                <span className={cn('w-6 text-[11px] font-bold', on ? 'text-primary' : 'text-muted-foreground')}>{label}</span>
                <span className="flex-1">{name}</span>
                {on && <Check className="size-4 text-primary" aria-hidden />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import * as React from 'react';
import { messages, type Locale, type Messages } from './translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);
const STORAGE_KEY = 'fitgram.locale';

function detectInitial(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && saved in messages) return saved;
  const lang = window.navigator.language.slice(0, 2).toLowerCase();
  if (lang === 'pt' || lang === 'es') return lang;
  return 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(detectInitial);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

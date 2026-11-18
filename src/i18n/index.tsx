import * as React from 'react';
import { isLocale, messages, type Locale, type Messages } from './translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);
const STORAGE_KEY = 'fitgram-lang';

/** Ordem: ?lang= no endereço → escolha guardada → língua do browser → português. */
function detectInitial(): Locale {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(q)) return q;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // armazenamento bloqueado: segue para a língua do browser
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return 'pt';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(detectInitial);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // sem armazenamento: a escolha vale só nesta visita
    }
  }, []);

  React.useEffect(() => {
    const t = messages[locale];
    document.documentElement.lang = t.meta.htmlLang;
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', t.meta.htmlLang.replace('-', '_'));
  }, [locale]);

  const value = React.useMemo<I18nContextValue>(() => ({ locale, setLocale, t: messages[locale] }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

/** Atalho para o dicionário da língua ativa. */
export function useT(): Messages {
  return useI18n().t;
}

export { fmt } from './translations';

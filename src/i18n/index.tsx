import * as React from 'react';
import { messages, type Locale, type Messages } from './translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

// Todo o texto visível está em português de Portugal; o seletor de língua foi retirado.
function detectInitial(): Locale {
  return 'pt';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(detectInitial);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = 'pt-PT';
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = 'pt-PT';
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

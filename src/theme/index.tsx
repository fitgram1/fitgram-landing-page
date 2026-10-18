import * as React from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'fitgram.theme';

function detectInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = readSaved();
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let switchTimer = 0;

function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement;
  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-switching');
    window.clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => root.classList.remove('theme-switching'), 400);
  }
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B0C0E' : '#F8F9FA');
}

function save(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* modo privado: a escolha só vale para esta sessão */
  }
}

function readSaved(): Theme | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(detectInitial);

  const setTheme = React.useCallback((t: Theme) => {
    save(t);
    applyTheme(t, true);
    setThemeState(t);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      save(next);
      applyTheme(next, true);
      return next;
    });
  }, []);

  React.useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sem escolha guardada, acompanha o tema do dispositivo em tempo real.
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => {
      if (readSaved()) return;
      const next: Theme = mq.matches ? 'dark' : 'light';
      applyTheme(next, true);
      setThemeState(next);
    };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

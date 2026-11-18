import { useId } from 'react';
import { useTheme } from '@/theme';
import { useT } from '@/i18n';

/** Sol ↔ lua: o núcleo cresce, a máscara desliza e os raios recolhem (≈320 ms). */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const isDark = theme === 'dark';
  const maskId = `tt-${useId().replace(/:/g, '')}`;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t.common.themeToLight : t.common.themeToDark}
      title={isDark ? t.common.themeLight : t.common.themeDark}
      className={`theme-toggle inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground outline-none transition-[background-color,border-color,transform] duration-150 hover:border-primary/50 hover:bg-secondary focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <circle
            cx="12"
            cy="12"
            r="7"
            fill="#000"
            style={{
              transform: isDark ? 'translate(5px,-4px)' : 'translate(16px,-14px)',
              transition: 'transform 320ms var(--ease-out)',
            }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="5"
          fill="currentColor"
          mask={`url(#${maskId})`}
          style={{
            transformOrigin: '12px 12px',
            transform: isDark ? 'scale(1.75)' : 'scale(1)',
            transition: 'transform 320ms var(--ease-out)',
          }}
        />
        <g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            transformOrigin: '12px 12px',
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0.4) rotate(45deg)' : 'scale(1) rotate(0)',
            transition: 'transform 320ms var(--ease-out), opacity 200ms',
          }}
        >
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </g>
      </svg>
    </button>
  );
}

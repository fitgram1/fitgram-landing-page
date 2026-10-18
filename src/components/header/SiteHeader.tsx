import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, LogIn } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ButtonLink } from '@/components/ui/button';
import { TLink } from '@/lib/nav';
import { anchorY } from '@/lib/anchors';
import { links, routes } from '@/lib/links';
import { cn } from '@/lib/utils';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { navItems } from './navData';

/** Que item do menu corresponde ao ponto da página onde o visitante está. */
function useActiveKey(pathname: string): string | null {
  const [key, setKey] = useState<string | null>(null);
  useEffect(() => {
    if (pathname === routes.pricing) return setKey('planos');
    if (pathname === routes.faq) return setKey('faq');
    if (pathname !== routes.home) return setKey(null);
    let raf = 0;
    const compute = () => {
      raf = 0;
      const y = window.scrollY + window.innerHeight * 0.45;
      const at = (k: string) => anchorY(k) ?? Infinity;
      const formatsTop = document.getElementById('formatos')?.getBoundingClientRect().top;
      const offerTop = document.getElementById('offer')?.getBoundingClientRect().top;
      let next: string | null = null;
      if (offerTop !== undefined && offerTop + window.scrollY <= y) next = null;
      else if (formatsTop !== undefined && formatsTop + window.scrollY - window.innerHeight * 0.2 <= y) next = 'modalidades';
      else if (y >= at('atletas')) next = 'atletas';
      else if (y >= at('treinadores')) next = 'treinadores';
      else if (y >= at('explorar')) next = 'funcionalidades';
      setKey(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);
  return key;
}

/** Compacta após o scroll e esconde-se ao descer / reaparece ao subir. Nunca altera o layout (o cabeçalho é fixo). */
function useHeaderScroll(locked: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const dy = y - last;
      if (Math.abs(dy) > 8) {
        setHidden(dy > 0 && y > 360 && !locked);
        last = y;
      }
      if (y < 120) setHidden(false);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [locked]);
  return { scrolled, hidden: hidden && !locked };
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const { scrolled, hidden } = useHeaderScroll(megaOpen || mobileOpen);
  const activeKey = useActiveKey(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeTimer = useRef(0);
  const openTimer = useRef(0);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  const closeMega = useCallback((returnFocus = false) => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    setMegaOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Fecha tudo ao mudar de página.
  useEffect(() => {
    closeMega();
    setMobileOpen(false);
  }, [pathname, closeMega]);

  // Fora do cabeçalho / Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeMega();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeMega(true);
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [megaOpen, closeMega]);

  // Indicador laranja partilhado: acompanha o item em hover e regressa ao ativo.
  const target = hoverKey ?? activeKey;
  useLayoutEffect(() => {
    const measure = () => {
      const el = target ? itemRefs.current[target] : null;
      const list = listRef.current;
      if (!el || !list) return setBar(null);
      const a = el.getBoundingClientRect();
      const b = list.getBoundingClientRect();
      setBar({ x: a.left - b.left + 10, w: a.width - 20 });
    };
    measure();
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 340); // depois da compactação do cabeçalho
    return () => {
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
  }, [target, scrolled]);

  const scheduleOpen = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setMegaOpen(true), 90);
  };
  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  };

  const solid = scrolled || megaOpen;

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => {
          setHoverKey(null);
          if (megaOpen) scheduleClose();
        }}
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        onBlur={(e) => {
          if (megaOpen && !headerRef.current?.contains(e.relatedTarget as Node | null)) closeMega();
        }}
        className={cn(
          'site-header fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color,backdrop-filter] duration-300 ease-out will-change-transform',
          hidden ? '-translate-y-full' : 'translate-y-0',
          solid ? 'border-border bg-[hsl(var(--header-bg))] backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-transparent',
          megaOpen && 'bg-background',
        )}
      >
        <a
          href="#conteudo"
          onClick={(e) => {
            e.preventDefault();
            const main = document.getElementById('conteudo');
            main?.setAttribute('tabindex', '-1');
            main?.focus();
            main?.scrollIntoView();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Saltar para o conteúdo
        </a>
        <div
          className={cn(
            'mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-6 transition-[height] duration-300 ease-out',
            scrolled ? 'h-[60px]' : 'h-[72px]',
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Principal" className="relative hidden min-[1240px]:block">
            <ul ref={listRef} className="relative flex items-center">
              {navItems.map((item, i) => {
                const isActive = activeKey === item.key;
                const cls = cn(
                  'nav-in relative inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  isActive || hoverKey === item.key || (item.mega && megaOpen) ? 'text-foreground' : 'text-muted-foreground',
                );
                return (
                  <li key={item.key} style={{ ['--i' as string]: i }} className="nav-in-li">
                    {item.mega ? (
                      <button
                        ref={(el) => {
                          triggerRef.current = el;
                          itemRefs.current[item.key] = el;
                        }}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-funcionalidades"
                        aria-haspopup="true"
                        onClick={() => (megaOpen ? closeMega() : setMegaOpen(true))}
                        onMouseEnter={() => {
                          setHoverKey(item.key);
                          scheduleOpen();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setMegaOpen(true);
                            requestAnimationFrame(() => document.querySelector<HTMLElement>('#mega-funcionalidades a')?.focus());
                          }
                        }}
                        className={cls}
                      >
                        {item.label}
                        <ChevronDown className={cn('size-3.5 transition-transform duration-200', megaOpen && 'rotate-180')} aria-hidden />
                      </button>
                    ) : (
                      <TLink
                        ref={(el) => {
                          itemRefs.current[item.key] = el;
                        }}
                        to={item.to!}
                        aria-current={isActive ? 'page' : undefined}
                        onMouseEnter={() => {
                          setHoverKey(item.key);
                          window.clearTimeout(openTimer.current);
                          if (megaOpen) scheduleClose();
                        }}
                        className={cls}
                      >
                        {item.label}
                      </TLink>
                    )}
                  </li>
                );
              })}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-px left-0 h-[2px] rounded-full bg-primary transition-[transform,width,opacity] duration-[280ms] ease-out"
                style={{ width: bar?.w ?? 0, transform: `translateX(${bar?.x ?? 0}px)`, opacity: bar ? 1 : 0 }}
              />
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="nav-in" />
            {links.login && (
              <ButtonLink href={links.login} variant="ghost" size="sm" className="nav-in hidden min-[1240px]:inline-flex" style={{ ['--i' as string]: 7 }}>
                <LogIn className="size-4" aria-hidden />
                Entrar
              </ButtonLink>
            )}
            <ButtonLink href={links.signup} size="sm" className="nav-in hidden px-5 min-[1240px]:inline-flex" style={{ ['--i' as string]: 8 }}>
              Começar agora
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              aria-controls="menu-movel"
              onClick={() => setMobileOpen((v) => !v)}
              className="relative inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/60 outline-none transition-transform duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 min-[1240px]:hidden"
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span className={cn('absolute left-0 top-0 h-[2px] w-5 rounded bg-foreground transition-transform duration-300 ease-out', mobileOpen && 'translate-y-[6px] rotate-45')} />
                <span className={cn('absolute left-0 top-[6px] h-[2px] w-5 rounded bg-foreground transition-opacity duration-200', mobileOpen && 'opacity-0')} />
                <span className={cn('absolute left-0 top-3 h-[2px] w-5 rounded bg-foreground transition-transform duration-300 ease-out', mobileOpen && '-translate-y-[6px] -rotate-45')} />
              </span>
            </button>
          </div>
        </div>

        <MegaMenu open={megaOpen} onNavigate={() => closeMega()} />
        <ScrollProgress visible={scrolled} />
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
          hamburgerRef.current?.focus();
        }}
      />
    </>
  );
}

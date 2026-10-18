import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, LogIn, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ButtonLink } from '@/components/ui/button';
import { TLink, useGo } from '@/lib/nav';
import { links } from '@/lib/links';
import { cn } from '@/lib/utils';
import { megaCategories, navItems } from './navData';

/**
 * Painel de navegação em ecrã inteiro. É irmão do <header> (e não filho) porque o header usa
 * backdrop-filter, que transformaria este `fixed` num elemento posicionado relativamente ao header.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const go = useGo();
  const [expanded, setExpanded] = useState<string | null>('funcionalidades');
  const [sub, setSub] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Bloqueia o scroll do fundo enquanto o menu está aberto.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Mantém o foco dentro do painel.
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Fecha primeiro (liberta o scroll) e só depois navega, para que a âncora funcione.
  const nav = (to: string) => (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => requestAnimationFrame(() => go(to)));
  };

  let n = 0;
  const stagger = () => ({ animationDelay: `${60 + 45 * n++}ms` });

  return (
    <div
      id="menu-movel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      ref={panelRef}
      className={cn(
        'fixed inset-0 z-[60] flex flex-col bg-background transition-[opacity,transform,visibility] duration-300 ease-out min-[1240px]:hidden',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0 [transition-delay:0s,0s,300ms]',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/60 outline-none transition-transform duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <nav aria-label="Principal (móvel)" className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
        <ul className="flex flex-col">
          {navItems.map((item) => {
            const current = item.to === pathname;
            if (item.mega) {
              const isOpen = expanded === item.key;
              return (
                <li key={item.key} className={cn('border-b border-border', open && 'mega-item-in')} style={stagger()}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : item.key)}
                    className="flex min-h-[56px] w-full items-center justify-between text-left text-[22px] font-bold tracking-tight outline-none focus-visible:text-primary"
                  >
                    {item.label}
                    <ChevronDown className={cn('size-5 text-muted-foreground transition-transform duration-300', isOpen && 'rotate-180')} aria-hidden />
                  </button>
                  <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <ul className="pb-3">
                        {megaCategories.map((c) => {
                          const subOpen = sub === c.key;
                          return (
                            <li key={c.key}>
                              <button
                                type="button"
                                aria-expanded={subOpen}
                                tabIndex={isOpen ? 0 : -1}
                                onClick={() => setSub(subOpen ? null : c.key)}
                                className="flex min-h-[48px] w-full items-center justify-between rounded-lg px-1 text-left text-[16px] font-semibold text-muted-foreground outline-none focus-visible:text-primary"
                              >
                                <span className={cn(subOpen && 'text-foreground')}>{c.title}</span>
                                <ChevronDown className={cn('size-4 transition-transform duration-300', subOpen && 'rotate-180')} aria-hidden />
                              </button>
                              <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', subOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                                <ul className="overflow-hidden">
                                  {c.items.map((it) => {
                                    const Icon = it.icon;
                                    return (
                                      <li key={it.label}>
                                        <TLink
                                          to={it.to}
                                          tabIndex={subOpen ? 0 : -1}
                                          onClick={nav(it.to)}
                                          className="flex min-h-[48px] items-center gap-3 rounded-lg px-1 text-[15px] outline-none focus-visible:text-primary"
                                        >
                                          <Icon className="size-4 text-primary" aria-hidden />
                                          {it.label}
                                        </TLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={item.key} className={cn('border-b border-border', open && 'mega-item-in')} style={stagger()}>
                <TLink
                  to={item.to!}
                  onClick={nav(item.to!)}
                  aria-current={current ? 'page' : undefined}
                  className={cn('flex min-h-[56px] items-center text-[22px] font-bold tracking-tight outline-none focus-visible:text-primary', current && 'text-primary')}
                >
                  {item.label}
                </TLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-border bg-background px-6 pb-6 pt-4">
        <ButtonLink href={links.signup} size="lg" className="w-full" onClick={nav(links.signup)}>
          Começar agora
          <ArrowRight className="size-5" aria-hidden />
        </ButtonLink>
        {links.login && (
          <ButtonLink href={links.login} size="lg" variant="outline" className="mt-3 w-full">
            <LogIn className="size-4" aria-hidden />
            Entrar
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TLink } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { getMegaCategories } from './navData';
import { useT } from '@/i18n';

/**
 * Painel de «Funcionalidades». Fica sempre no DOM (para animar), mas invisível e fora da ordem de tabulação quando fechado.
 * Passar o rato entre categorias não o fecha: o fecho é adiado pelo cabeçalho (180 ms) e cancelado ao regressar.
 */
export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const t = useT();
  const megaCategories = getMegaCategories(t);
  const [cat, setCat] = useState(megaCategories[0].key);
  const active = megaCategories.find((c) => c.key === cat) ?? megaCategories[0];

  return (
    <div
      id="mega-funcionalidades"
      aria-hidden={!open}
      className={cn(
        'absolute inset-x-0 top-full border-b border-border bg-background shadow-pop',
        'origin-top transition-[opacity,transform,visibility] ease-out',
        open ? 'visible translate-y-0 opacity-100 duration-[250ms]' : 'invisible -translate-y-2 opacity-0 duration-[200ms] [transition-delay:0s,0s,200ms]',
      )}
    >
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-6 py-8 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
        <div role="tablist" aria-label={t.common.categories} aria-orientation="vertical" className="flex flex-col gap-1">
          {megaCategories.map((c, i) => {
            const on = c.key === active.key;
            return (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={open ? 0 : -1}
                onMouseEnter={() => setCat(c.key)}
                onFocus={() => setCat(c.key)}
                onClick={() => setCat(c.key)}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold outline-none transition-[background-color,color,transform,opacity] duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {c.title}
                <span className={cn('h-5 w-[3px] rounded-full bg-primary transition-transform duration-200', on ? 'scale-y-100' : 'scale-y-0')} aria-hidden />
              </button>
            );
          })}
        </div>

        <ul key={active.key} role="tabpanel" aria-label={active.title} className="grid content-start gap-1 sm:grid-cols-2">
          {active.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className={cn(open && 'mega-item-in')} style={{ animationDelay: `${i * 45}ms` }}>
                <TLink
                  to={item.to}
                  tabIndex={open ? 0 : -1}
                  onClick={onNavigate}
                  className="group flex items-start gap-3 rounded-xl p-3 outline-none transition-colors duration-150 hover:bg-secondary focus-visible:bg-secondary focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold leading-tight">{item.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{item.hint}</span>
                  </span>
                </TLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden rounded-2xl border border-border bg-card p-5 lg:block">
          <div key={active.key} className="mega-item-in">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{active.title}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{active.blurb}</p>
            <div className="mt-5 flex items-end gap-1.5" aria-hidden>
              {[28, 40, 34, 52, 46, 64, 58].map((h, i) => (
                <span key={i} className="w-full rounded-t bg-primary/80" style={{ height: h, opacity: 0.35 + i * 0.09 }} />
              ))}
            </div>
            <TLink
              to={active.items[0].to}
              tabIndex={open ? 0 : -1}
              onClick={onNavigate}
              className="mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-foreground outline-none hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {t.nav.seeDemo}
              <ArrowRight className="size-4" aria-hidden />
            </TLink>
          </div>
        </div>
      </div>
    </div>
  );
}

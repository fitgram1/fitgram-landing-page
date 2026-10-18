import * as React from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ANCHORS, scrollToAnchor } from '@/lib/anchors';

type Doc = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/** Navega com View Transitions quando existem; senão, navegação normal (sem ecrã de carregamento). */
export function useGo() {
  const navigate = useNavigate();
  const loc = useLocation();
  return React.useCallback(
    (to: string) => {
      if (isExternal(to)) {
        window.location.assign(to);
        return;
      }
      const [path, hash = ''] = to.split('#');
      const targetPath = path || loc.pathname;
      // Mesma página: apenas desliza até à âncora.
      if (targetPath === loc.pathname) {
        if (hash && (hash in ANCHORS || document.getElementById(hash))) {
          if (!scrollToAnchor(hash)) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(window.history.state, '', `${loc.pathname}#${hash}`);
        } else if (!hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      const go = () => navigate(hash ? `${targetPath}#${hash}` : targetPath);
      const doc = document as Doc;
      if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        doc.startViewTransition(() => flushSync(go));
      } else {
        go();
      }
    },
    [navigate, loc.pathname],
  );
}

interface TLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

/** Link interno (ou externo) com transição de página; mantém um <a href> real para teclado, SEO e "abrir em novo separador". */
export const TLink = React.forwardRef<HTMLAnchorElement, TLinkProps>(({ to, onClick, children, ...rest }, ref) => {
  const go = useGo();
  const base = (import.meta.env.BASE_URL as string).replace(/\/$/, '');
  const href = isExternal(to) ? to : `${base}${to}`;
  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (rest.target && rest.target !== '_self') return;
        if (isExternal(to)) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
});
TLink.displayName = 'TLink';

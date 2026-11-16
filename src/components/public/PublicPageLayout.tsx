import { useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Contentor único de todas as páginas públicas: mesma largura, mesmo ritmo vertical, mesma entrada. */
export function PublicContainer({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1120px] px-6', className)}>{children}</div>;
}

interface PublicPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Estrutura partilhada pelas páginas finais (Perguntas frequentes).
 * O cabeçalho e o rodapé vêm do SiteLayout; aqui vive o que é comum ao conteúdo.
 */
export function PublicPageLayout({ title, description, children }: PublicPageLayoutProps) {
  useEffect(() => {
    document.title = `${title} · FitGram`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);

  return (
    <div id="conteudo" className="page-enter relative overflow-x-clip pt-[72px]">
      {children}
    </div>
  );
}

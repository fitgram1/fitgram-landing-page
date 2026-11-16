import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TLink } from '@/lib/nav';

/** Web twin of FitGram's RNR Button (apps/app/components/ui/button.tsx) variants. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] active:duration-[120ms] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90',
        outline: 'border border-border bg-card shadow-sm shadow-black/5 hover:border-primary/50 hover:bg-secondary',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-10 gap-1.5 px-4',
        lg: 'h-12 px-7 text-base',
        pill: 'h-12 rounded-full px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Mostra um indicador e desativa o botão durante ações assíncronas. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

/** Ligação com aspeto de botão. `href` pode ser uma rota (`/perguntas-frequentes`), uma âncora da história (`/#explorar`) ou um URL externo. */
export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, href, ...props }, ref) => (
    <TLink ref={ref} to={href} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink, buttonVariants };

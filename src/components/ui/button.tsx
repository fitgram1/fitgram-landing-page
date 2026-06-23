import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Web twin of FitGram's RNR Button (apps/app/components/ui/button.tsx) variants. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90',
        outline: 'border border-border bg-background shadow-sm shadow-black/5 hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 gap-1.5 rounded-md px-3',
        lg: 'h-12 rounded-md px-7 text-base',
        pill: 'h-12 rounded-full px-7 text-base',
        icon: 'h-10 w-10',
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
Button.displayName = 'Button';

/** Anchor styled as a button — for in-page CTAs that scroll to the form. */
export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink, buttonVariants };

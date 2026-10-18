import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border border-input bg-card px-4 py-2 text-base outline-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-out hover:border-foreground/25',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };

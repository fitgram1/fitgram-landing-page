import { Text, type TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex flex-row items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'border border-primary/30 bg-primary/10 text-primary',
        muted: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps extends TextProps, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <Text className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

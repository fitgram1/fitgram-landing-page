import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef<HTMLDivElement, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('p-6', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardContent };

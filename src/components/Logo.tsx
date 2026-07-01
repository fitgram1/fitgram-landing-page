import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

export function Logo({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="FitGram — go to top"
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={cn('flex flex-row items-center gap-2.5', className)}
    >
      <View className="grid size-9 place-items-center rounded-[10px] bg-primary">
        <Text className="text-lg font-extrabold text-primary-foreground">F</Text>
      </View>
      <Text
        className={cn(
          'text-xl font-extrabold tracking-tight transition-colors',
          active ? 'text-primary' : 'text-foreground',
        )}
      >
        FitGram
      </Text>
    </a>
  );
}

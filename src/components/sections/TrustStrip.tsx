import { View, Text } from 'react-native';
import { Reveal } from '@/components/Reveal';
import { useI18n } from '@/i18n';
import * as React from 'react';

export function TrustStrip() {
  const { t } = useI18n();
  return (
    <View className="border-y border-border bg-secondary/60 py-7">
      <Reveal>
        <View className="container flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-center text-sm text-muted-foreground">
          <Text className="font-semibold text-foreground">{t.strip.prefix}</Text>
          {t.strip.items.map((item, i) => (
            <React.Fragment key={item}>
              <Text className="font-medium">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
              {i < t.strip.items.length - 1 && <Text aria-hidden>·</Text>}
            </React.Fragment>
          ))}
        </View>
      </Reveal>
    </View>
  );
}

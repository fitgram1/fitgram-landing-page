import { View, Text } from 'react-native';
import { Logo } from '@/components/Logo';
import { useI18n } from '@/i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer
      id="footer"
      className="border-t border-border py-7 text-sm text-muted-foreground"
    >
      <View className="container flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Logo />
        <Text className="text-muted-foreground">{t.footer.tagline}</Text>
        <a
          href="mailto:fitgrampt@gmail.com"
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          fitgrampt@gmail.com
        </a>
        <Text className="text-[13px] text-muted-foreground/70">{t.footer.rights}</Text>
      </View>
    </footer>
  );
}

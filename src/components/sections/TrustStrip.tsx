import { useI18n } from '@/i18n';
import * as React from 'react';

export function TrustStrip() {
  const { t } = useI18n();
  return (
    <div className="border-y border-border bg-secondary/60 py-7">
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-center text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{t.strip.prefix}</span>
        {t.strip.items.map((item, i) => (
          <React.Fragment key={item}>
            <span className="font-medium">{item}</span>
            {i < t.strip.items.length - 1 && <span aria-hidden>·</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

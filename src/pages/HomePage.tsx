import { useEffect } from 'react';
import { useT } from '@/i18n';
import { Story, Chapter } from '@/components/story';
import { GetApp } from '@/components/sections/GetApp';
import { Duo } from '@/components/sections/Duo';
import { Pricing } from '@/components/sections/Pricing';

export function HomePage() {
  const { meta } = useT();
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [meta]);
  return (
    <div id="conteudo">
      <Story />
      <Chapter />
      <Duo />
      <Pricing />
      <GetApp />
    </div>
  );
}

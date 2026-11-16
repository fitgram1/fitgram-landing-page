import { useEffect } from 'react';
import { Story, Chapter } from '@/components/story';
import { GetApp } from '@/components/sections/GetApp';

export function HomePage() {
  useEffect(() => {
    document.title = 'FitGram — Treina melhor. Evolui sempre.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Uma plataforma para criares treinos, acompanhares a nutrição e transformares progresso em resultados.');
  }, []);
  return (
    <div id="conteudo">
      <Story />
      <Chapter />
      <GetApp />
    </div>
  );
}

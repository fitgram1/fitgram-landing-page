import { useEffect } from 'react';
import { Story, Chapter } from '@/components/story';
import { Offer } from '@/components/sections/Offer';

export function HomePage() {
  useEffect(() => {
    document.title = 'FitGram — Treina melhor. Evolui sempre.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Uma plataforma para criares treinos, acompanhares a nutrição e transformares progresso em resultados.');
  }, []);
  return (
    <div id="conteudo">
      <Story />
      <Chapter />
      <Offer />
    </div>
  );
}

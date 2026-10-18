import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registo único: qualquer cena importa daqui para não registar o plugin duas vezes.
gsap.registerPlugin(ScrollTrigger);

/** Linguagem de movimento (segundos). Ver secção 16 do briefing. */
export const motion = {
  micro: 0.15,
  tab: 0.24,
  card: 0.35,
  reveal: 0.55,
  shared: 0.65,
} as const;

export { gsap, ScrollTrigger };

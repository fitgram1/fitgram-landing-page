import { Footprints, Waves, Bike, Trophy, type LucideIcon } from 'lucide-react';

/** Cenário de cada modalidade, pela mesma ordem de `chapter2.sportItems` no dicionário. */
export interface SportScene {
  key: 'run' | 'swim' | 'bike' | 'hyrox';
  icon: LucideIcon;
  /** Cor de destaque da modalidade. */
  accent: string;
  /** Fundo do cenário (gradiente). */
  bg: string;
}

export const sportScenes: SportScene[] = [
  { key: 'run', icon: Footprints, accent: '#f97316', bg: 'radial-gradient(120% 90% at 50% 110%, #7c2d12 0%, #2a1208 45%, #0b0b0c 80%)' },
  { key: 'swim', icon: Waves, accent: '#38bdf8', bg: 'linear-gradient(180deg, #031525 0%, #063a5c 55%, #0b6b8f 100%)' },
  { key: 'bike', icon: Bike, accent: '#a3e635', bg: 'radial-gradient(120% 90% at 50% 120%, #365314 0%, #14200a 50%, #0b0b0c 85%)' },
  { key: 'hyrox', icon: Trophy, accent: '#fde047', bg: 'linear-gradient(135deg, #0b0b0c 0%, #1c1917 45%, #422006 100%)' },
];

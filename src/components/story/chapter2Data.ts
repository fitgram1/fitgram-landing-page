import { Dumbbell, Footprints, Waves, Bike, Timer, Trophy, Activity, Repeat, Zap, Flame, type LucideIcon } from 'lucide-react';

export interface FormatDef {
  key: string;
  label: string;
  icon: LucideIcon;
  title: string;
  lines: { label: string; value: string }[];
}

/** Valores de exemplo — mostrados sempre com a etiqueta "Exemplo ilustrativo". */
export const formats: FormatDef[] = [
  { key: 'forca', label: 'Força', icon: Dumbbell, title: 'Supino inclinado', lines: [
    { label: 'Séries', value: '3' }, { label: 'Repetições', value: '12' }, { label: 'Carga', value: '24 kg' }, { label: 'Descanso', value: '90 s' } ] },
  { key: 'corrida', label: 'Corrida', icon: Footprints, title: 'Corrida contínua', lines: [
    { label: 'Distância', value: '8 km' }, { label: 'Ritmo', value: '5:30 /km' }, { label: 'Zona', value: 'Z2' }, { label: 'Duração', value: '44 min' } ] },
  { key: 'intervalos', label: 'Intervalos', icon: Activity, title: 'Séries de 400 m', lines: [
    { label: 'Repetições', value: '6 × 400 m' }, { label: 'Ritmo', value: '4:15 /km' }, { label: 'Pausa', value: '90 s' }, { label: 'Aquecimento', value: '10 min' } ] },
  { key: 'amrap', label: 'AMRAP', icon: Repeat, title: 'Máximo de rondas', lines: [
    { label: 'Tempo', value: '12 min' }, { label: 'Barras', value: '5' }, { label: 'Flexões', value: '10' }, { label: 'Agachamentos', value: '15' } ] },
  { key: 'emom', label: 'EMOM', icon: Timer, title: 'A cada minuto', lines: [
    { label: 'Duração', value: '10 min' }, { label: 'Min. ímpar', value: '12 swings' }, { label: 'Min. par', value: '10 burpees' }, { label: 'Pausa', value: 'livre' } ] },
  { key: 'hyrox', label: 'HYROX', icon: Trophy, title: 'Simulação HYROX', lines: [
    { label: 'Estações', value: '8' }, { label: 'Corrida', value: '8 × 1 km' }, { label: 'Tempo alvo', value: '1h 25' }, { label: 'Ritmo base', value: '5:10 /km' } ] },
];

export interface SportDef {
  label: string;
  icon: LucideIcon;
  vars: string[];
}

export const sports: SportDef[] = [
  { label: 'Corrida', icon: Footprints, vars: ['Distância', 'Ritmo', 'Zonas de FC'] },
  { label: 'HYROX', icon: Trophy, vars: ['Estações', 'Tempo alvo', 'Transições'] },
  { label: 'Remo', icon: Flame, vars: ['Metros', 'Ritmo /500 m', 'Remadas/min'] },
  { label: 'Ciclismo', icon: Bike, vars: ['Distância', 'Cadência', 'Intervalos'] },
  { label: 'Natação', icon: Waves, vars: ['Metros', 'Ritmo /100 m', 'Séries'] },
  { label: 'Voleibol', icon: Zap, vars: ['Duração', 'Foco técnico', 'Intensidade'] },
];

export const ecosystem = [
  { label: 'Treino', sub: 'Planos, formatos e registo ao vivo' },
  { label: 'Nutrição', sub: 'Refeições e macros no mesmo sítio' },
  { label: 'Progresso', sub: 'Recordes e evolução ao longo do tempo' },
];

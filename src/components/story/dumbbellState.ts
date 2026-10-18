/** Estado partilhado: o GSAP escreve, o useFrame lê (sem re-renders React). Ficheiro leve, fora do chunk do three.js. */
export interface DumbbellState {
  rotX: number;
  rotY: number;
  rotZ: number;
  trail: number;
  /** 1 = oscilação suave no hero; 0 = só o scroll comanda a rotação. */
  idle: number;
}
export const initialDumbbell = (): DumbbellState => ({ rotX: 0.25, rotY: -0.6, rotZ: 0.18, trail: 0, idle: 1 });

import { Tilt } from "./Tilt";

import traineesScreen from '@/assets/trainees-screen.png';
export function ClientPanel() {
  return (
    <Tilt lean="right">
      <div className="w-[260px] rounded-[44px] bg-neutral-900 p-[10px] shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        <div className="overflow-hidden rounded-[36px] bg-black">
          <img
            src={traineesScreen}
            alt="Lista de clientes no painel da app FitGram"
            className="block w-full"
          />
        </div>
      </div>
    </Tilt>
  );
}

import { Tilt } from "./Tilt";
import planWorkout from '@/assets/plan-workout.mp4';
import planDiet from '@/assets/plan-diet.mp4';
import planForms from '@/assets/plan-forms.mp4';

const VIDEOS = { workout: planWorkout, diet: planDiet, forms: planForms } as const;

export function PlanPanel({ plan = 'workout' }: { plan?: 'workout' | 'diet' | 'forms' }) {
  // Both clips are raw screen recordings, so wrap them in an iPhone mockup.
  return (
    <Tilt lean="left">
      <div className="w-[260px] rounded-[44px] bg-neutral-900 p-[10px] shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        <div className="overflow-hidden rounded-[36px] bg-black">
          <video
            src={VIDEOS[plan]}
            className="block w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </Tilt>
  );
}

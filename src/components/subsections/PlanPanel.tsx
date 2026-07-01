import { useState } from "react";
import { Tilt } from "./Tilt";
import planWorkout from '@/assets/plan-workout.mp4';
import planDiet from '@/assets/plan-diet.mp4';
export function PlanPanel() {
  const videos = [planWorkout, planDiet];
  const [index, setIndex] = useState(0);
  return (
    <Tilt lean="left">
      <video
        key={index}
        src={videos[index]}
        className="block w-[272px]"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setIndex((i) => (i + 1) % videos.length)}
      />
    </Tilt>
  );
}

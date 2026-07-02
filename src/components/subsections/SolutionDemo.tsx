import solutionDemo from '@/assets/solution-demo.mp4';

export function SolutionDemo() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* soft glow behind the window */}
      <div
        className="animate-glow-pulse pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/15 blur-[70px]"
        aria-hidden
      />
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
        <video
          src={solutionDemo}
          className="block w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}

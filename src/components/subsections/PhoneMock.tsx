import phoneDemo from "@/assets/hero-demo.mp4";

export function PhoneMock() {
  return (
    <div className="w-[290px] rounded-[48px] bg-neutral-900 p-[11px] shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
      <div className="overflow-hidden rounded-[38px] bg-black">
        <video
          src={phoneDemo}
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

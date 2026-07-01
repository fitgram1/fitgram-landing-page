import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Tilt({ children, lean }: { children: ReactNode; lean: 'left' | 'right' }) {
  const tilt =
    lean === 'left'
      ? '[transform:rotateY(12deg)_rotateX(5deg)]'
      : '[transform:rotateY(-12deg)_rotateX(5deg)]';
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center [perspective:1600px]">
      <div
        className={cn(
          'relative z-10 transition-transform duration-700 ease-out hover:[transform:rotateY(0deg)_rotateX(0deg)]',
          tilt,
        )}
      >
        {children}
      </div>
    </div>
  );
}
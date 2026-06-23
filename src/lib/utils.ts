import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Same `cn` helper FitGram uses in apps/app/lib/utils.ts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

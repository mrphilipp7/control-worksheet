import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertStatNumberToString(status: number) {
  switch (status) {
    case 0:
      return 'idle';
    case 1:
      return 'running';
    case 2:
      return 'finished';
    case 3:
      return 'down';
    default:
      return 'status unknown';
  }
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TIMER_PRESETS = [
  {
    value: 1500,
    display: "Pomodoro",
  },
  {
    value: 2,
    display: "Short Break",
  },
  {
    value: 1800,
    display: "Long Break",
  },
]

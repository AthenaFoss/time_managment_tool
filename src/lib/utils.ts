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

export const convertSecondsToMMSS = (time: number) => {
  const format = (value: number) => {
    return value < 10 ? `0${value}` : value
  }
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${format(minutes)}:${format(seconds)}`
}

export const playPomodoroNotificationSound = () => {
  const audio = new Audio("/pomodoroSound.mp3")
  return audio.play().catch((error) => {
    console.error("Error playing notification sound:", error)
  })
}

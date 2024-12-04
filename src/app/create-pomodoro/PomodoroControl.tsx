"use client"

import { Button } from "@/components/ui/button"
import {
  convertSecondsToMMSS,
  playPomodoroNotificationSound,
  pomodoroToastMessages,
  TIMER_PRESETS,
} from "@/lib/utils"
import PomodoroClock from "./PomodoroClock"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { TimerMessageKey } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CircleStop, Pause, Play, TimerReset } from "lucide-react"

function PomodoroControl() {
  const [time, setTime] = useState(1500)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isActiveButton, setActiveButton] = useState<TimerMessageKey | "">(
    "Pomodoro"
  )
  const { toast } = useToast()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTimerRunning) {
        if (time > 0) {
          setTime(time - 1)
        } else if (time === 0 && isTimerRunning) {
          //  when timer ends play notification sound
          playPomodoroNotificationSound()
          // show toast msg based on the selected timer when timer stops
          if (isActiveButton) {
            toast({
              title: pomodoroToastMessages[isActiveButton],
            })
          }
          clearInterval(intervalId)
          setIsTimerRunning(false)
          // set button to play when timer stops
          setActiveButton("")
        }
      }
    }, 1000)

    if (isTimerRunning) {
      document.title = `${convertSecondsToMMSS(time)} - remaining`
    }

    return () => clearInterval(intervalId)
  }, [isTimerRunning, time])

  // select between pomodoro | short break | long break
  const selectTimer = (value: number, display: TimerMessageKey) => {
    setIsTimerRunning(false)
    setTime(value)
    setActiveButton(display)
    // change to app name
    document.title = "Time Management Tool"
  }

  // start and pause timer
  const handleTimerToggle = () => {
    //if no timer selected show notification
    if (!time) {
      toast({
        title: "You need to set a timer first",
      })
    } else {
      setIsTimerRunning(!isTimerRunning)
    }
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setTime(TIMER_PRESETS[0].value)
    setActiveButton(TIMER_PRESETS[0].display)
    // change to app name
    document.title = "Time Management Tool"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-evenly gap-4 md:gap-8 flex-wrap ">
        {TIMER_PRESETS.map(({ value, display }) => (
          <div key={display}>
            <Button
              onClick={() => selectTimer(value, display)}
              variant={`${isActiveButton === display ? "default" : "outline"}`}
            >
              {display}
            </Button>
          </div>
        ))}
      </CardHeader>
      <CardContent className="flex justify-center">
        <PomodoroClock currentTime={time} />
      </CardContent>
      <CardFooter className="justify-center gap-4">
        <Button variant="ghost" onClick={handleTimerToggle}>
          {!isTimerRunning ? <Play /> : time === 0 ? <CircleStop /> : <Pause />}
        </Button>
        <Button variant="ghost" onClick={handleTimerReset}>
          <TimerReset />
        </Button>
      </CardFooter>
    </Card>
  )
}
export default PomodoroControl

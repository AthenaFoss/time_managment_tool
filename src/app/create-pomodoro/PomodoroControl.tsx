import { Button } from "@/components/ui/button"
import { TIMER_PRESETS } from "@/lib/utils"
import PomodoroClock from "./PomodoroClock"

function PomodoroControl() {
  return (
    <div>
      <h2 className="text-center text-3xl md:text-4xl  font-bold py-9">
        Pomodoro Timer
      </h2>
      <div className="flex flex-col gap-10  mx-auto  items-center">
        <div className="flex items-center justify-evenly gap-4 md:gap-8 flex-wrap ">
          {TIMER_PRESETS.map(({ value, display }) => (
            <div key={display}>
              <Button>{display}</Button>
            </div>
          ))}
        </div>
        <PomodoroClock />
        <div className="flex items-center gap-3 md:gap-10">
          <Button>Start</Button>
          <Button>Reset</Button>
        </div>
      </div>
    </div>
  )
}
export default PomodoroControl

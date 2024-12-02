import { Button } from "@/components/ui/button"
import { TIMER_PRESETS } from "@/lib/utils"

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
        <div className="bg-black rounded-full h-56 w-56 md:h-72 md:w-72  lg:h-96 lg:w-96 flex items-center justify-center">
          <h2 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white -tracking-tighter">
            00:00
          </h2>
        </div>
        <div className="flex items-center gap-3 md:gap-10">
          <Button>Start</Button>
          <Button>Reset</Button>
        </div>
      </div>
    </div>
  )
}
export default PomodoroControl

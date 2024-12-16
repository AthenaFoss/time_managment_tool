export default function ProgressBar({
  completePercentage,
}: {
  completePercentage: number
}) {
  return (
    <div className="flex justify-end items-center gap-x-3">
      <div className="w-full md:w-[30%]">
        <div className="relative">
          <div className="bg-gray-200 -z-10 h-[8px] rounded-[4px] absolute top-0 right-0 left-0"></div>
          <div
            className={`bg-green-400 h-[8px] rounded-[4px] transition-all duration-300`}
            style={{ width: `${completePercentage}%` }}
          ></div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {completePercentage.toFixed(0)}%
      </p>
    </div>
  )
}

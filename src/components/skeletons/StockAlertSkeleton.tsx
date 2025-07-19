import { Skeleton } from '../ui/skeleton'

function StockAlertSkeleton() {
  return (
    <div className="space-y-4">
      {Array(1)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="bg-background w-full p-4 space-y-2 border"
            >
              <div className="flex flex-row items-center gap-6 justify-between w-full">
                <Skeleton className="h-4 w-2/3 " />
                <Skeleton className="w-1/4 h-4" />
              </div>
              <div className="flex flex-row items-center gap-6 justify-between w-full">
                <Skeleton className="h-4 w-1/4 " />
                <Skeleton className="w-1/4 h-6" />
              </div>
              <Skeleton className="h-4 w-full" />
            </Skeleton>
          )
        })}
    </div>
  )
}
export default StockAlertSkeleton

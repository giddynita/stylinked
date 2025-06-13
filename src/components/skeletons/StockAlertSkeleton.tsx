import { Skeleton } from '../ui/skeleton'

function StockAlertSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="flex flex-col items-center justify-between bg-muted h-15 bg-muted w-full p-3 3space-y-2"
            >
              <div className="flex flex-row items-center justify-between w-full">
                <Skeleton className="h-4 w-30 bg-muted-foreground" />
                <Skeleton className="bg-muted-foreground w-4 h-4" />
              </div>
              <Skeleton className="h-3 bg-muted-foreground w-full" />
            </Skeleton>
          )
        })}
    </div>
  )
}
export default StockAlertSkeleton

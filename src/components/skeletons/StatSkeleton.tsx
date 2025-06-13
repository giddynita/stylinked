import { Skeleton } from '../ui/skeleton'

function StatSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              className="h-30 p-6 bg-muted flex flex-col justify-between"
              key={index}
            >
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-30 bg-muted-foreground" />
                <Skeleton className="h-6 w-6 bg-muted-foreground" />
              </div>
              <Skeleton className="w-30 h-6 bg-muted-foreground" />
            </Skeleton>
          )
        })}
    </div>
  )
}
export default StatSkeleton

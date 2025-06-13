import { Skeleton } from '../ui/skeleton'

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="flex items-center justify-between bg-muted h-15 bg-muted w-full p-4"
            >
              <div className="space-y-1">
                <Skeleton className="h-4 w-30 bg-muted-foreground" />
                <Skeleton className="h-4 w-30 bg-muted-foreground" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-3 w-10 bg-muted-foreground" />
                <Skeleton className="h-3 w-10 bg-muted-foreground" />
              </div>
            </Skeleton>
          )
        })}
    </div>
  )
}
export default OrdersSkeleton

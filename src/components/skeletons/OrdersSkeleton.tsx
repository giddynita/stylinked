import { Skeleton } from '../ui/skeleton'

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array(1)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className=" bg-background border w-full p-2 space-y-4"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-4 w-1/3  " />
              </div>

              <div className="flex items-center gap-6">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </Skeleton>
          )
        })}
    </div>
  )
}
export default OrdersSkeleton

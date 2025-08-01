import { Skeleton } from '../ui/skeleton'

function BuyerRecentOrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array(2)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              className=" border rounded-lg w-full p-4 space-y-4"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 w-1/2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>

                  <div className="flex gap-4 w-1/3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/4">
                  <Skeleton className="h-6 w-full  " />
                  <Skeleton className="h-6 w-full  " />
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default BuyerRecentOrdersSkeleton

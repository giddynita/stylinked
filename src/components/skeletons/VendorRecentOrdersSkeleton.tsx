import { Skeleton } from '../ui/skeleton'

function VendorRecentOrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array(2)
        .fill(null)
        .map((_, index) => {
          return (
            <div key={index} className="border rounded-lg w-full p-4 space-y-4">
              <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex flex-col w-1/3 gap-2">
                  <Skeleton className="h-4 w-full  " />
                  <Skeleton className="h-8 w-full  " />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default VendorRecentOrdersSkeleton

import { Skeleton } from '../ui/skeleton'

function ProductListCardSkeleton() {
  return (
    <div className="space-y-4">
      {Array(6)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className=" bg-background flex w-full p-4 space-x-4 items-start"
            >
              <Skeleton className="h-20 w-20 rounded-full " />
              <div className="flex-1 space-y-4">
                <div className="flex sm:flex-row flex-col items-start justify-between gap-4">
                  <div className="flex-1 w-full space-y-2">
                    <Skeleton className=" h-6" />
                    <div className="flex sm:flex-row flex-col sm:w-1/2 gap-2">
                      <Skeleton className="w-1/2 h-4 " />
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-1/2 h-4" />
                    </div>
                  </div>
                  <Skeleton className="w-16 h-6" />
                </div>
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </div>
            </Skeleton>
          )
        })}
    </div>
  )
}
export default ProductListCardSkeleton

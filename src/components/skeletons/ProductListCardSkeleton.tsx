import { Skeleton } from '../ui/skeleton'

function ProductListCardSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="bg-muted h-30 bg-background flex w-full p-2 space-x-2 shadow-md"
            >
              <Skeleton className="h-full w-26 " />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-1/2 h-6" />
                <div className="flex flex-row gap-6">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-16 h-6" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col justify-between gap-2 h-full w-24 ">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>
            </Skeleton>
          )
        })}
    </div>
  )
}
export default ProductListCardSkeleton

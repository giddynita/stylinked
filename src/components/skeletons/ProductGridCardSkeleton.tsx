import { Skeleton } from '../ui/skeleton'

function ProductGridCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array(6)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="bg-muted h-75 bg-background w-full space-y-2"
            >
              <div className="relative h-35 w-full bg-muted-foreground rounded-t-lg">
                <Skeleton className="h-full  w-full rounded-b-none" />
                <Skeleton className="absolute top-2 right-2 h-4 w-12" />
                <Skeleton className="absolute top-2 left-2 h-4 w-12" />
              </div>
              <div className="p-2 space-y-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-12 h-4" />
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-1/3 h-6" />
                </div>
              </div>
            </Skeleton>
          )
        })}
    </div>
  )
}
export default ProductGridCardSkeleton

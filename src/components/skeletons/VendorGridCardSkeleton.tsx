import { Skeleton } from '../ui/skeleton'

function ProductGridCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="bg-background w-full p-6 space-y-4"
            >
              <div className=" w-full text-center space-y-3 ">
                <Skeleton className="h-20  w-20 rounded-full mx-auto" />
                <Skeleton className=" h-6 w-1/2 bg-muted-foreground/30 mx-auto" />
                <Skeleton className=" h-6 w-1/3 mx-auto bg-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </Skeleton>
          )
        })}
    </div>
  )
}
export default ProductGridCardSkeleton

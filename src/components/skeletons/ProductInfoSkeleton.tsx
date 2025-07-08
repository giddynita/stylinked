import { Skeleton } from '../ui/skeleton'

function ProductInfoSkeleton() {
  return (
    <div>
      <Skeleton className="w-full   space-y-8 p-6">
        <Skeleton className="w-30 h-30 mx-auto bg-background " />
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="w-30 h-30 bg-background" />
          <Skeleton className="w-30 h-30 bg-background" />
          <Skeleton className="w-30 h-30 bg-background" />
          <Skeleton className="w-30 h-30 bg-background" />
        </div>
        <Skeleton className="w-full h-96 bg-background" />
      </Skeleton>
    </div>
  )
}
export default ProductInfoSkeleton

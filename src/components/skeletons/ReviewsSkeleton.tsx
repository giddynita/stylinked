import { Skeleton } from '../ui/skeleton'

function ReviewsSkeleton() {
  return (
    <Skeleton className="w-full bg-background border p-4 space-y-4">
      <div className="flex flex-1 flex-wrap gap-4 justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="w-2/3 h-8" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-36 h-6" />
      </div>
      <Skeleton className="w-full h-36" />
    </Skeleton>
  )
}
export default ReviewsSkeleton

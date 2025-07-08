import { Skeleton } from '../ui/skeleton'

function ExistingReviewsSkeleton() {
  return (
    <div>
      <Skeleton className="w-full  bg-background p-4">
        <Skeleton className="w-2/3 h-10 mb-2" />
        <Skeleton className="w-full h-16" />
      </Skeleton>
    </div>
  )
}
export default ExistingReviewsSkeleton

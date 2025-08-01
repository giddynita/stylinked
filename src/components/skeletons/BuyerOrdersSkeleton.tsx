import { Skeleton } from '../ui/skeleton'

function BuyerOrdersSkeleton() {
  return (
    <div className="p-4 space-y-4 border rounded-lg mt-4">
      <div className="sm:flex justify-between gap-x-4 space-y-2">
        <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="flex flex-col gap-y-2 gap-x-4">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-15 h-4 sm:ml-auto" />
        </div>
      </div>

      <Skeleton className="w-full h-20" />
      <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4 justify-between">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
    </div>
  )
}
export default BuyerOrdersSkeleton

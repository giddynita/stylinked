import { Skeleton } from '../ui/skeleton'

function VendorOrdersSkeleton() {
  return (
    <div className="p-4 border rounded-lg space-y-8 mt-4">
      <Skeleton className="w-full h-10" />
      <Skeleton className="p-6 rounded-lg space-y-4 bg-background">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
          <div className="w-1/2 space-y-1">
            <Skeleton className="w-full h-6 " />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
          </div>
          <div className="space-y-1 w-1/3">
            <Skeleton className="w-full h-6 " />
            <Skeleton className="w-full h-6" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="w-max flex gap-2">
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
          <Skeleton className="w-1/3 h-6" />
        </div>
      </Skeleton>
    </div>
  )
}
export default VendorOrdersSkeleton

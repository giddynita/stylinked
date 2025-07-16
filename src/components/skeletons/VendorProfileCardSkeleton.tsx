import { Skeleton } from '../ui/skeleton'

function VendorProfileCardSkeleton() {
  return (
    <Skeleton className="p-6 bg-background space-y-4 lg:flex gap-10">
      <Skeleton className="w-32 h-32 rounded-full" />
      <div className="lg:flex-1 space-y-4">
        <div className="space-y-2 lg:flex lg:justify-between gap-10">
          <div className="space-y-2 lg:w-full">
            <Skeleton className="w-full h-10" />
            <div className="w-1/2 flex gap-4 lg:mt-4">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-1/2 h-6" />
            </div>
          </div>
          <Skeleton className="w-48 h-10" />
        </div>
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-1/3 h-6" />
      </div>
    </Skeleton>
  )
}
export default VendorProfileCardSkeleton

import { Skeleton } from '../ui/skeleton'

function UserSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="  h-8 sm:h-4 w-[50px] sm:w-[100px]" />
    </div>
  )
}
export default UserSkeleton

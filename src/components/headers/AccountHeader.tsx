import { SidebarTrigger } from '../ui/sidebar'
import { UserSkeleton } from '../skeletons'
import ModeToggle from '../theme/mode-toggle'
import { ProfileImage } from '../global'
import { useUserData } from '@/utils/hooks'

function AccountHeader() {
  const { data: userInfo, isLoading } = useUserData()
  return (
    <header className="h-16 border-b bg-card  flex items-center justify-between px-4 bg-navbarbg/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {isLoading ? (
          <UserSkeleton />
        ) : (
          <h1 className="text-2xl font-semibold text-foreground">
            Hi, {userInfo?.userData?.firstname}{' '}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4 ">
        <ModeToggle align="start" />
        <ProfileImage />
      </div>
    </header>
  )
}
export default AccountHeader

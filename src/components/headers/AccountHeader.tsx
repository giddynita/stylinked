import { SidebarTrigger } from '../ui/sidebar'
import ModeToggle from '../theme/mode-toggle'
import { ProfileImage } from '../global'
import { useSelector } from 'react-redux'
import type { UserDataType } from '@/utils/types'

function AccountHeader() {
  const { userData }: { userData: UserDataType } = useSelector(
    (state: any) => state.userState
  )

  return (
    <header className="h-16 border-b bg-card  flex items-center justify-between px-4 bg-navbarbg/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold text-foreground">
          Hi, {userData?.firstname}
        </h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 ">
        <ModeToggle align="start" />
        <ProfileImage userData={userData} />
      </div>
    </header>
  )
}
export default AccountHeader

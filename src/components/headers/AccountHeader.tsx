import { SidebarTrigger } from '../ui/sidebar'
import { useSelector } from 'react-redux'
import type { UserDataType } from '@/utils/types'
import { lazy, Suspense } from 'react'
import { User } from 'lucide-react'
const ProfileImage = lazy(() => import('../global/ProfileImage'))
const ModeToggle = lazy(() => import('../theme/mode-toggle'))

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
      <div className="flex items-center gap-3 sm:gap-4">
        <Suspense fallback={null}>
          <ModeToggle align="start" />
        </Suspense>
        <Suspense fallback={<User className="h-4 w-4" />}>
          <ProfileImage userData={userData} />
        </Suspense>
      </div>
    </header>
  )
}
export default AccountHeader

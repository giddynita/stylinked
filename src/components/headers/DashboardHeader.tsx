import { User } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { Suspense } from 'react'
import { UserSkeleton } from '../skeletons'
import ModeToggle from '../theme/mode-toggle'
import { Avatar, AvatarFallback } from '../ui/avatar'

function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-card  flex items-center justify-between px-4 bg-navbarbg/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-foreground">Account</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 ">
        <ModeToggle align="start" />
        <Suspense fallback={<UserSkeleton />}>
          <p className="text-xs sm:text-sm text-muted-foreground  max-w-16 sm:max-w-full ">
            Welcome back,{' '}
            <span className="font-bold text-foreground ">John </span>
          </p>
        </Suspense>
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
export default DashboardHeader

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
          <span className="text-xs sm:text-sm text-muted-foreground hidde sm:contents max-w-16 sm:max-w-full">
            Welcome back,{' '}
            <span className="font-bold text-foreground sm:-ml-2">John </span>
          </span>
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

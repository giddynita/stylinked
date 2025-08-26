import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'
import { Link, useLocation } from 'react-router-dom'
import { LogIn, User } from 'lucide-react'
import { defaultSidebarNavlinks, vendorSidebarNavlinks } from '@/utils/data'
import { lazy, Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'

const ProfileImage = lazy(() => import('../global/ProfileImage'))

function AppSidebar() {
  const { isMobile, open, setOpen } = useSidebar()
  if (!isMobile && open) {
    setOpen(false)
  }
  const location = useLocation()
  const pathname = location.pathname
  const { userRole, userData, user } = useSelector(
    (state: any) => state.userState
  )
  const navlinks = useMemo(() => {
    if (userRole == 'vendor') {
      return vendorSidebarNavlinks
    }
    return defaultSidebarNavlinks
  }, [userRole])

  return (
    <div>
      <Sidebar side="right" variant="sidebar">
        <SidebarHeader className=" pl-1 mb-2">
          <SidebarMenu>
            <SidebarMenuItem className="mx-auto my-2">
              <Suspense fallback={<User className="h-4 w-4" />}>
                {user && <ProfileImage userData={userData} />}
              </Suspense>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu>
            {navlinks.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`font-medium ${
                    item.url === pathname
                      ? 'text-primary hover:bg-primary/10 hover:text-primary'
                      : 'text-muted-foreground'
                  } `}
                  asChild
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        {
          <SidebarFooter className="px-3">
            <SidebarMenu>
              {!user && (
                <>
                  <SidebarMenuItem>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full"
                    >
                      <Link to="/auth">
                        <LogIn />
                        <span>Login</span>
                      </Link>
                    </Button>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Button
                      asChild
                      size="lg"
                      variant="default"
                      className="w-full"
                    >
                      <Link to="/auth/sign-up">Sign Up</Link>
                    </Button>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarFooter>
        }
      </Sidebar>
    </div>
  )
}

export default AppSidebar

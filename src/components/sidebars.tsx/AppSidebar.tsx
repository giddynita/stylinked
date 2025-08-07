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
import { LogIn } from 'lucide-react'
import { defaultSidebarNavlinks, vendorSidebarNavlinks } from '@/utils/data'
import { ProfileImage } from '../global'
import { useUser } from '@supabase/auth-helpers-react'
import { useUserData } from '@/utils/hooks'
import { Skeleton } from '../ui/skeleton'
import { useMemo } from 'react'

export function AppSidebar() {
  const { isMobile, open, setOpen } = useSidebar()
  if (!isMobile && open) {
    setOpen(false)
  }
  const location = useLocation()
  const pathname = location.pathname
  const user = useUser()
  const { data: userInfo, isLoading } = useUserData()
  const role = userInfo?.userRole.role
  const userData = userInfo?.userData
  const navlinks = useMemo(() => {
    if (role == 'vendor') {
      return vendorSidebarNavlinks
    }
    return defaultSidebarNavlinks
  }, [role])

  return (
    <div>
      <Sidebar side="right" variant="sidebar">
        <SidebarHeader className=" pl-1 mb-2">
          <SidebarMenu>
            <SidebarMenuItem className="mx-auto my-2">
              {user && (
                <ProfileImage userData={userData} isLoading={isLoading} />
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu>
            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              navlinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
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

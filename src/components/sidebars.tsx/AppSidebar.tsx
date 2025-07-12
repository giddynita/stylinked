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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Loader2Icon, LogIn, LogOutIcon, X } from 'lucide-react'
import { nonUserSidebarNavLinks } from '@/utils/data'
import { ProfileImage } from '../global'
import { logoutAction } from '@/utils/action'
import { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'

export function AppSidebar() {
  const { isMobile, open, setOpen, toggleSidebar } = useSidebar()
  if (!isMobile && open) {
    setOpen(false)
  }
  const location = useLocation()
  const pathname = location.pathname
  const user = useUser()
  const [logout, setLogout] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="pr-4 pl-1 mb-2">
        <SidebarMenu className="flex flex-row justify-between">
          <SidebarMenuItem>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleSidebar}
            >
              <X />
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>{user && <ProfileImage />}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {nonUserSidebarNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.url === pathname}>
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
            {user ? (
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="w-full bg-destructive hover:bg-red-500 cursor-pointer"
                  onClick={() => {
                    logoutAction({ navigate, setLogout })
                  }}
                >
                  {logout ? (
                    <>
                      <span>Logging out</span>
                      <Loader2Icon className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <LogOutIcon className="rotate-180" />
                      <span>Log out</span>
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
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
  )
}

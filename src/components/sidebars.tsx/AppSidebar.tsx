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
import { LogIn, X } from 'lucide-react'
import { nonUserSidebarNavLinks } from '@/utils/data'
import { ProfileImage } from '../global'
import { getAuthUser } from '@/utils/action'

export function AppSidebar() {
  const { isMobile, open, setOpen, toggleSidebar } = useSidebar()
  if (!isMobile && open) {
    setOpen(false)
  }
  const location = useLocation()
  const pathname = location.pathname
  const user = getAuthUser()

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
          <SidebarMenuItem>{user !== null && <ProfileImage />}</SidebarMenuItem>
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
      {user === null && (
        <SidebarFooter className="px-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/auth">
                  <LogIn />
                  <span>Login</span>
                </Link>
              </Button>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Button asChild size="lg" variant="default" className="w-full">
                <Link to="/auth/sign-up">Get Started</Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

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
import ModeToggle from '../theme/mode-toggle'
import { Button } from '../ui/button'
import { Link, useLocation } from 'react-router-dom'
import { LogIn, X } from 'lucide-react'
import { nonUserSidebarNavLinks } from '@/utils/data'

export function AppSidebar() {
  const { isMobile, open, setOpen, toggleSidebar } = useSidebar()
  if (!isMobile && open) {
    setOpen(false)
  }
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="pr-3 pl-1">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-start justify-between gap-x-4 ">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleSidebar}
            >
              <X />
            </button>
            <ModeToggle />
          </SidebarMenuItem>
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
    </Sidebar>
  )
}

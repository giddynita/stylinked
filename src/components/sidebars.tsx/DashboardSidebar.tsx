import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  Package as PackageIcon,
  List,
  User,
  LinkIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Home,
} from 'lucide-react'

const navigation = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Products', url: '/products', icon: PackageIcon },
  { title: 'Orders', url: '/orders', icon: List },
  { title: 'Settings', url: '/settings', icon: User },
]

function DashboardSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar
      className="bg-gradient-to-b from-primary/10 to-accent/50 contents"
      collapsible="icon"
    >
      <SidebarHeader className="h-16 bg-accent flex items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <LinkIcon className="w-6 h-6 font-bolder text-primary" />
                <span className="text-sm font-bold mt-1 text-primary">
                  STYLINKED
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url == currentPath}>
                    <NavLink
                      to={item.url}
                      className="text-muted-foreground w-max"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 bg-accent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-muted text-muted-foreground w-max hover:text-accent-foreground my-2"
            >
              <Link to="/">
                <Home />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-destructive/80 hover:bg-destructive w-max  text-white"
            >
              <Link to="/auth">
                <LogOutIcon />
                <span>Log out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default DashboardSidebar

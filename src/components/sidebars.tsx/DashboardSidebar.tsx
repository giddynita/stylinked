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
  useSidebar,
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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
const navigation = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Products', url: '/products', icon: PackageIcon },
  { title: 'Orders', url: '/orders', icon: List },
  { title: 'Settings', url: '/settings', icon: User },
]

function DashboardSidebar() {
  const { state, isMobile } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const tooltip = state == 'collapsed' && !isMobile
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
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url == currentPath}
                      >
                        <NavLink
                          to={item.url}
                          className="text-muted-foreground w-max"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      className={` translate-x-[0px] translate-y-[10px] ${
                        !tooltip && 'hidden'
                      }`}
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4 bg-accent">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger>
                <SidebarMenuButton
                  asChild
                  className="bg-muted text-muted-foreground w-max hover:text-accent-foreground"
                >
                  <Link to="/">
                    <Home />
                    <span>Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent
                className={` translate-y-[12px] ${!tooltip && 'hidden'}`}
              >
                Back to Home
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger>
                <SidebarMenuButton
                  asChild
                  className="bg-destructive/80 hover:bg-destructive w-max  text-white"
                >
                  <Link to="/auth">
                    <LogOutIcon />
                    <span>Log out</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent className={`  ${!tooltip && 'hidden'}`}>
                Log out
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default DashboardSidebar

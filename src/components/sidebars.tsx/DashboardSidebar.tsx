import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  Loader2Icon,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useState } from 'react'
const navigation = [
  { title: 'Dashboard', url: 'dashboard', icon: LayoutDashboardIcon },
  { title: 'Products', url: 'products', icon: PackageIcon },
  { title: 'Orders', url: 'orders', icon: List },
  { title: 'Settings', url: 'settings', icon: User },
]

function DashboardSidebar() {
  const { state, isMobile } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop()

  const [logout, setLogout] = useState<boolean>(false)
  const navigate = useNavigate()

  const tooltip = state == 'collapsed' && !isMobile
  return (
    <Sidebar
      className="bg-gradient-to-b from-primary/10 to-accent/50"
      collapsible="icon"
    >
      <SidebarHeader className="h-16  flex items-center justify-center">
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
      <SidebarContent>
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
                          className="text-muted-foreground"
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

      <SidebarFooter className="py-4 ">
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
                <SidebarMenuButton className="bg-destructive/80 hover:bg-destructive w-max  text-white pl-2 pr-4">
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

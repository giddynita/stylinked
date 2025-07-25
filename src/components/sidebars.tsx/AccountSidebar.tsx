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
import { logoutAction } from '@/utils/action'

const navigation = [
  { title: 'Dashboard', url: 'dashboard', icon: LayoutDashboardIcon },
  { title: 'Products', url: 'products', icon: PackageIcon },
  { title: 'Orders', url: 'orders', icon: List },
  { title: 'Settings', url: 'settings', icon: User },
]

function AccountSidebar() {
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
      <SidebarHeader className="h-16">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className=" mt-1.5 w-max">
              <Link to="/">
                <LinkIcon className="w-10 h-10 font-bolder text-primary" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
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
                      side="right"
                      sideOffset={-4}
                      className={`${!tooltip && 'hidden'}`}
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
              <TooltipTrigger className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer w-max rounded-sm">
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    className="flex items-center text-xs gap-2 py-2 pl-2 pr-4"
                  >
                    <Home className="w-4 h-4" />
                    <span>Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={-4}
                className={` ${!tooltip && 'hidden'}`}
              >
                Back to Home
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger
                className=" w-max  text-white flex items-center text-xs gap-2 rounded-sm"
                onClick={() => {
                  logoutAction({ navigate, setLogout })
                }}
              >
                <SidebarMenuButton
                  asChild
                  className="bg-destructive hover:bg-red-500 cursor-pointer"
                >
                  {logout ? (
                    <div className="py-2 pl-2 pr-4">
                      <Loader2Icon className="animate-spin" />
                      <span>Logging out</span>
                    </div>
                  ) : (
                    <div className="py-2 pl-2 pr-4">
                      <LogOutIcon className="rotate-180 w-4 h-4" />
                      <span>Log out</span>
                    </div>
                  )}
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={-4}
                className={`  ${!tooltip && 'hidden'}`}
              >
                Log out
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AccountSidebar

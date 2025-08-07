import { SidebarProvider } from '@/components/ui/sidebar'
import { sectionSuspense, sidebarSuspense } from '@/utils/suspense'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const AppFooter = lazy(() => import('../global/AppFooter'))
const AppSidebar = lazy(() => import('../sidebars.tsx/AppSidebar'))

function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      {sidebarSuspense(<AppSidebar />)}
      <div className="bg-gradient-to-b from-primary/10 to-accent/50 w-screen">
        <Outlet />
        {sectionSuspense(<AppFooter />)}
      </div>
    </SidebarProvider>
  )
}
export default AppLayout

import { SidebarProvider } from '@/components/ui/sidebar'
import { sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '../sidebars.tsx/AppSidebar'
const AppFooter = lazy(() => import('../global/AppFooter'))

function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="bg-gradient-to-b from-primary/10 to-accent/50 w-screen">
        <Outlet />
        {sectionSuspense(<AppFooter />)}
      </div>
    </SidebarProvider>
  )
}
export default AppLayout

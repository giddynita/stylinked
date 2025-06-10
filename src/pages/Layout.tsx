import AppHeader from '@/components/headers/AppHeader'
import { AppSidebar } from '@/components/sidebars.tsx/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="scrollable">
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
export default Layout

import { AppFooter } from '@/components/global'
import { AppSidebar } from '@/components/sidebars.tsx/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="bg-gradient-to-b from-primary/10 to-accent/50 w-screen">
        <Outlet />
        <AppFooter />
      </main>
    </SidebarProvider>
  )
}
export default Layout

import AccountHeader from '@/components/headers/AccountHeader'
import AccountSidebar from '@/components/sidebars.tsx/AccountSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

function AccountLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AccountSidebar />
      <div className="flex-1 flex flex-col">
        <AccountHeader />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
export default AccountLayout

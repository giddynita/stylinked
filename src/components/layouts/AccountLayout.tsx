import AccountHeader from '@/components/headers/AccountHeader'
import { SidebarProvider } from '@/components/ui/sidebar'
import { sidebarSuspense } from '@/utils/suspense'
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
const AccountSidebar = lazy(
  () => import('@/components/sidebars.tsx/AccountSidebar')
)

function AccountLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      {sidebarSuspense(<AccountSidebar />)}
      <div className="flex-1 flex flex-col">
        <AccountHeader />
        <main className="flex-1 p-4 w-full">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
export default AccountLayout

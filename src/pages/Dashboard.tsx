import { AccountPagesHeading } from '@/components/headings'
import { useSelector } from 'react-redux'
import type { UserRole } from '@/utils/types'
import type React from 'react'
import { lazy } from 'react'
import { accountPageSuspense } from '@/utils/suspense'

const BuyerDashboard = lazy(
  () => import('@/components/account/dashboard/buyer/BuyerDashboard')
)
const VendorDashboard = lazy(
  () => import('@/components/account/dashboard/vendor/VendorDashboard')
)

const Dashboard = () => {
  const { userRole }: { userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const rolePageDesc: Record<string, string> = {
    buyer: "Here's what's happening with your orders",
    vendor: 'Your business metrics at a glance',
  }
  const pageDesc = rolePageDesc[userRole.role]

  const roleDashboard: Record<string, React.ComponentType> = {
    buyer: BuyerDashboard,
    vendor: VendorDashboard,
  }

  const DashboardComponent = roleDashboard[userRole.role]
  return (
    <>
      <AccountPagesHeading pageTitle="Dashboard" pageDesc={pageDesc} />
      {accountPageSuspense(<DashboardComponent />)}
    </>
  )
}

export default Dashboard

import { AccountPagesHeading } from '@/components/headings'
import { VendorDashboard } from '@/components/account'
import { useUserData } from '@/utils/hooks'

const Dashboard = () => {
  const { data: userInfo } = useUserData()
  const pageDesc =
    userInfo?.userRole.role == 'buyer'
      ? "Here's what's happening with your orders"
      : userInfo?.userRole.role == 'vendor'
      ? 'Your business metrics at a glance'
      : ''

  return (
    <>
      <AccountPagesHeading pageTitle="Dashboard" pageDesc={pageDesc} />
      <VendorDashboard />
    </>
  )
}

export default Dashboard

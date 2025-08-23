import { AccountPagesHeading } from '@/components/headings'
import { BuyerDashboard, VendorDashboard } from '@/components/account'
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
      {userInfo?.userRole.role == 'vendor' && <VendorDashboard />}
      {userInfo?.userRole.role == 'buyer' && <BuyerDashboard />}
    </>
  )
}

export default Dashboard

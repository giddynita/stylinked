import { VendorOrders } from '@/components/account'
import { AccountPagesHeading } from '@/components/headings'
import { useUserData } from '@/utils/hooks'

function Orders() {
  const { data: userInfo } = useUserData()
  const pageDesc =
    userInfo?.userRole.role == 'buyer'
      ? 'Track and manage your order history'
      : userInfo?.userRole.role == 'vendor'
      ? 'Manage and track all customer orders in one place'
      : ''

  return (
    <>
      <AccountPagesHeading pageTitle="Orders" pageDesc={pageDesc} />
      <div className="my-6">
        {userInfo?.userRole.role == 'vendor' && <VendorOrders />}
      </div>
    </>
  )
}
export default Orders

import { BuyerOrders, VendorOrders } from '@/components/account'
import { AccountPagesHeading } from '@/components/headings'
import type { UserRole } from '@/utils/types'
import { useSelector } from 'react-redux'

function Orders() {
  const { userRole }: { userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const rolePageDesc: Record<string, string> = {
    buyer: 'Track and manage your order history',
    vendor: 'Manage and track all customer orders in one place',
  }

  const pageDesc = rolePageDesc[userRole.role]

  const roleComponents: Record<string, React.ComponentType> = {
    buyer: BuyerOrders,
    vendor: VendorOrders,
  }

  const OrderComponent = roleComponents[userRole.role]

  return (
    <>
      <AccountPagesHeading pageTitle="Orders" pageDesc={pageDesc} />
      <div className="my-6">
        <OrderComponent />
      </div>
    </>
  )
}
export default Orders

import { VendorOrdersSkeleton } from '@/components/skeletons'
import OrdersTabsContent from '../OrdersTabsContent'
import { formatCreatedAt } from '@/utils/format'
import OrderTabsList from '../OrderTabsList'
import { nullSuspense } from '@/utils/suspense'
import { lazy } from 'react'
import type { OrdersWithPendingOrderNo } from '@/utils/types'

interface VendorOrdersProp {
  searchQuery: string
  isLoading: boolean
  isError: boolean
  orders: OrdersWithPendingOrderNo | undefined
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))

function VendorOrders({
  searchQuery,
  orders,
  isLoading,
  isError,
}: VendorOrdersProp) {
  const ordersDetails = orders?.sortedGroupedOrders?.map(
    ([order_id, order_items]) => {
      const amount = order_items.reduce((acc, item) => {
        const sum = acc + item.price * item.amount
        return sum
      }, 0)
      return {
        order_id,
        order_items,
        customer_email: order_items[0].email,
        customer_name: order_items[0].user_name,
        date: formatCreatedAt(order_items[0].created_at),
        order_amount: amount,
        status: order_items[0].status,
        shipping_address: order_items[0].shipping_address,
        phone: order_items[0].phone,
        tracking_number: '',
      }
    }
  )
  return (
    <>
      <OrderTabsList orders={ordersDetails} />
      {isLoading ? (
        <VendorOrdersSkeleton />
      ) : (
        <>
          <OrdersTabsContent orders={ordersDetails} searchQuery={searchQuery} />
          {nullSuspense(<FetchingError isError={isError} text="your orders" />)}
        </>
      )}
    </>
  )
}
export default VendorOrders

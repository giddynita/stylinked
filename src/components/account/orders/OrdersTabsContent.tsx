import { TabsContent } from '@/components/ui/tabs'
import type { CustomerOrder, OrderAndOrderItems } from '@/utils/types'
import { ShoppingBag } from 'lucide-react'
import VendorOrderCard from './vendor/VendorOrderCard'
import BuyerOrderCard from './buyer/BuyerOrderCard'
import { ordersTabsList } from '@/utils/data'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'

interface OrdersTabsContentProp {
  orders: CustomerOrder[] | OrderAndOrderItems[] | undefined
  searchQuery: string
  isError: boolean
}

const NoResult = lazy(() => import('@/components/global/NoResult'))

function OrdersTabsContent({
  orders,
  searchQuery,
  isError,
}: OrdersTabsContentProp) {
  const filteredOrders = orders?.filter((order) => {
    if ('customer_name' in order) {
      return (
        order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return (
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.orderItems?.some(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  })

  const filteredOrdersByStatus = (status: string) => {
    if (status === 'all') return filteredOrders
    return filteredOrders?.filter(
      (order) => order?.status?.toLowerCase() === status.toLowerCase()
    )
  }
  return (
    <>
      {ordersTabsList.map((status) => (
        <TabsContent key={status} value={status}>
          <div className="space-y-4 py-4">
            {filteredOrdersByStatus(status)?.map((order, index) =>
              'customer_name' in order ? (
                <VendorOrderCard key={index} order={order} />
              ) : (
                <BuyerOrderCard key={index} order={order} />
              )
            )}

            {nullSuspense(
              <>
                {filteredOrdersByStatus(status)?.length == 0 && (
                  <NoResult
                    isError={isError}
                    errorText="your orders"
                    text={`No ${status !== 'all' ? status : ''} orders found.`}
                    icon={ShoppingBag}
                  />
                )}
              </>
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
export default OrdersTabsContent

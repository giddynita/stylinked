import { NoResult } from '@/components/global'
import { TabsContent } from '@/components/ui/tabs'
import type { CustomerOrder, OrderAndOrderItems } from '@/utils/types'
import { ShoppingBag } from 'lucide-react'
import VendorOrderCard from './vendor/VendorOrderCard'
import BuyerOrderCard from './buyer/BuyerOrderCard'

interface OrdersTabsContentProp {
  orders: CustomerOrder[] | OrderAndOrderItems[] | undefined
  searchQuery: string
}

function OrdersTabsContent({ orders, searchQuery }: OrdersTabsContentProp) {
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
      {[
        'all',
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ].map((status) => (
        <TabsContent key={status} value={status} className="">
          <div className="space-y-4 py-4">
            <NoResult
              length={filteredOrdersByStatus(status)?.length}
              text={`No ${status} orders found.`}
              icon={ShoppingBag}
            />
            {filteredOrdersByStatus(status)?.map((order, index) =>
              'customer_name' in order ? (
                <VendorOrderCard key={index} order={order} />
              ) : (
                <BuyerOrderCard key={index} order={order} />
              )
            )}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
export default OrdersTabsContent

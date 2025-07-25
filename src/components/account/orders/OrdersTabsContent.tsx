import { NoResult } from '@/components/global'
import { TabsContent } from '@/components/ui/tabs'
import type { CustomerOrder } from '@/utils/types'
import { ShoppingBag } from 'lucide-react'
import OrderCard from './OrderCard'

interface OrdersTabsContentProp {
  orders: CustomerOrder[] | undefined
  searchQuery: string
}

function OrdersTabsContent({ orders, searchQuery }: OrdersTabsContentProp) {
  const filteredOrders = orders?.filter(
    (order) =>
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredOrdersByStatus = (status: string) => {
    if (status === 'all') return filteredOrders
    return filteredOrders?.filter(
      (order) => order?.status?.toLowerCase() === status.toLowerCase()
    )
  }
  return (
    <>
      {['all', 'pending', 'processing', 'shipped', 'delivered'].map(
        (status) => (
          <TabsContent key={status} value={status} className="">
            <div className="space-y-4 py-4">
              <NoResult
                length={filteredOrdersByStatus(status)?.length}
                text={`No ${status} orders found.`}
                icon={ShoppingBag}
              />
              {filteredOrdersByStatus(status)?.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </div>
          </TabsContent>
        )
      )}
    </>
  )
}
export default OrdersTabsContent

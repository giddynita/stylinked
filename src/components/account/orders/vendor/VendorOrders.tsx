import { VendorOrdersSkeleton } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import OrdersTabsContent from '../OrdersTabsContent'
import { formatCreatedAt } from '@/utils/format'
import { useState } from 'react'
import { useVendorOrders } from '@/utils/hooks'
import SearchBar from '../../SearchBar'
import OrderTabsList from '../OrderTabsList'

function VendorOrders() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: orders, isLoading } = useVendorOrders()
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
    <Card>
      <CardHeader>
        <CardTitle>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by order ID or customer name..."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <OrderTabsList orders={ordersDetails} />
          {isLoading ? (
            <VendorOrdersSkeleton />
          ) : (
            <OrdersTabsContent
              orders={ordersDetails}
              searchQuery={searchQuery}
            />
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
export default VendorOrders

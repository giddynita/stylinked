import {
  OrdersTabsContent,
  OrderTabsList,
  SearchBar,
} from '@/components/account'
import { AccountPagesHeading } from '@/components/headings'
import { OrdersSkeleton } from '@/components/skeletons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { formatCreatedAt } from '@/utils/format'
import { useVendorOrders } from '@/utils/hooks'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'

function Orders() {
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
    <>
      <AccountPagesHeading
        pageTitle="Orders"
        pageDesc="Manage and track all customer orders in one place"
      />
      <div className="my-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order Management
            </CardTitle>
            <CardDescription>
              View and manage customer orders with detailed tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search by order ID or customer name..."
            />
            {isLoading ? (
              <OrdersSkeleton />
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <OrderTabsList orders={ordersDetails} />
                <OrdersTabsContent
                  orders={ordersDetails}
                  searchQuery={searchQuery}
                />
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default Orders

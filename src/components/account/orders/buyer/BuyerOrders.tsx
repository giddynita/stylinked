import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SearchBar from '../../SearchBar'
import { useState } from 'react'
import { Tabs } from '@/components/ui/tabs'
import OrderTabsList from '../OrderTabsList'
import { useBuyerOrders } from '@/utils/hooks'
import OrdersTabsContent from '../OrdersTabsContent'
import { BuyerOrdersSkeleton } from '@/components/skeletons'
import { FetchingError } from '@/components/global'

function BuyerOrders() {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    data: ordersData,
    isLoading: ordersDataLoading,
    isError,
  } = useBuyerOrders()
  const buyerOrdersDetails = ordersData?.sortedOrders?.map((order) => {
    const orderItems = ordersData?.orderItems?.filter(
      (item) => item.order_id === order.order_id
    )
    return {
      orderItems,
      ...order,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by order ID, product name or vendor name..."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <OrderTabsList orders={ordersData?.sortedOrders} />
          {ordersDataLoading ? (
            <BuyerOrdersSkeleton />
          ) : (
            <>
              <OrdersTabsContent
                orders={buyerOrdersDetails}
                searchQuery={searchQuery}
              />
              <FetchingError isError={isError} text="your orders" />
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
export default BuyerOrders

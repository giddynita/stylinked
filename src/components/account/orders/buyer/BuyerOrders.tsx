import OrderTabsList from '../OrderTabsList'
import OrdersTabsContent from '../OrdersTabsContent'
import { BuyerOrdersSkeleton } from '@/components/skeletons'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'
import type { OrdersByBuyer } from '@/utils/types'

interface BuyerOrdersProp {
  searchQuery: string
  isLoading: boolean
  isError: boolean
  orders: OrdersByBuyer | undefined
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))

function BuyerOrders({
  searchQuery,
  orders,
  isLoading,
  isError,
}: BuyerOrdersProp) {
  const buyerOrdersDetails = orders?.sortedOrders?.map((order) => {
    const orderItems = orders?.orderItems?.filter(
      (item) => item.order_id === order.order_id
    )
    return {
      orderItems,
      ...order,
    }
  })

  return (
    <>
      <OrderTabsList orders={orders?.sortedOrders} />
      {isLoading ? (
        <BuyerOrdersSkeleton />
      ) : (
        <>
          <OrdersTabsContent
            orders={buyerOrdersDetails}
            searchQuery={searchQuery}
          />
          {nullSuspense(<FetchingError isError={isError} text="your orders" />)}
        </>
      )}
    </>
  )
}
export default BuyerOrders

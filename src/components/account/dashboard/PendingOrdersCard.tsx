import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { padNumber } from '@/utils/format'
import { useOrdersTrend, useVendorOrders } from '@/utils/hooks'
import { MdOutlinePendingActions } from 'react-icons/md'
import Trend from './Trend'

function PendingOrdersCard() {
  const { data: orders, isLoading: ordersLoading } = useVendorOrders()
  const { data: orderTrend, isLoading: trendLoading } = useOrdersTrend()
  console.log(orderTrend)

  const trend = orderTrend?.map((d) => {
    return { value: d.order_items_added }
  })
  return (
    <Card className="space-y-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
        <MdOutlinePendingActions className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {ordersLoading ? (
          <Skeleton className="w-1/3 h-8" />
        ) : (
          <div className="text-2xl font-bold">
            {padNumber(orders?.pendingOrdersLength) ?? 0}
          </div>
        )}
        <Trend trend={trend} isLoading={trendLoading} />
      </CardContent>
    </Card>
  )
}
export default PendingOrdersCard

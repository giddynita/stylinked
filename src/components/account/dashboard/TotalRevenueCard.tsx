import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { currencyFormatter } from '@/utils/format'
import { useOrdersTrend, useVendorOrders } from '@/utils/hooks'
import { GiMoneyStack } from 'react-icons/gi'
import RevenueTrend from './RevenueTrend'

function TotalRevenueCard() {
  const { data: orders, isLoading: ordersLoading } = useVendorOrders()
  const { data: revenueTrend, isLoading: trendLoading } = useOrdersTrend()
  const totalAmount = orders?.orders.reduce((sum, order) => {
    return sum + order.amount * order.price
  }, 0)

  const trend = revenueTrend?.map((d) => {
    return { value: d.order_items_added }
  })
  return (
    <Card className="space-y-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <GiMoneyStack className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {ordersLoading ? (
          <Skeleton className="w-1/3 h-8" />
        ) : (
          <div className="text-2xl font-bold">
            {currencyFormatter(totalAmount)}
          </div>
        )}
        <RevenueTrend trend={trend} isLoading={trendLoading} />
      </CardContent>
    </Card>
  )
}
export default TotalRevenueCard

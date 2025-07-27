import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { currencyFormatter, padNumber } from '@/utils/format'
import type { OrdersByBuyer } from '@/utils/types'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { GiMoneyStack } from 'react-icons/gi'
import { MdOutlinePendingActions } from 'react-icons/md'

interface DashboardStatsProp {
  ordersData: OrdersByBuyer | undefined
  ordersDataLoading: boolean
}

function DashboardStats({ ordersData, ordersDataLoading }: DashboardStatsProp) {
  const totalSpent = ordersData?.sortedOrders?.reduce((sum, order) => {
    return sum + order.order_total
  }, 0)
  const stat = [
    {
      title: 'Total Orders',
      icon: <ShoppingBag className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: padNumber(ordersData?.sortedOrders?.length) ?? 0,
      /* trend: revenueTrend,
      trendLoading: ordersTrendLoading, */
    },
    {
      title: 'Pending Orders',
      icon: <MdOutlinePendingActions className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: padNumber(ordersData?.pendingOrdersLength) ?? 0,
      /*  trend: productTrend,
      trendLoading: productsTrendLoading, */
    },
    {
      title: 'Completed Orders',
      icon: <CheckCircle className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: padNumber(ordersData?.completedOrdersLength) ?? 0,
      /* trend: pendingOrderTrend,
      trendLoading: ordersTrendLoading, */
    },
    {
      title: 'Total Spent',
      icon: <GiMoneyStack className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: currencyFormatter(totalSpent ?? 0),
      /* trend: pendingOrderTrend,
      trendLoading: ordersTrendLoading, */
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stat.map(({ title, icon, loading, value }, index) => {
        return (
          <Card key={index} className="space-y-0 hover:shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium flex flex-row items-center justify-between">
                {title}
                <span className="h-4 w-4 text-muted-foreground">{icon}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <Skeleton className="w-1/3 h-8" />
              ) : (
                <div className="text-2xl font-bold">{value}</div>
              )}
              {/* Analytics */}
              {/* <Trend trend={trend} isLoading={trendLoading} /> */}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
export default DashboardStats

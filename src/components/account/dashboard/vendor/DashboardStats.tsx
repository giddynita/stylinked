import type { OrdersWithPendingOrderNo, Product } from '@/utils/types'
import { GiMoneyStack } from 'react-icons/gi'
import { Package } from 'lucide-react'
import { currencyFormatter, padNumber } from '@/utils/format'
import { MdAccessTime, MdOutlinePendingActions } from 'react-icons/md'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
/* import Trend from '../Trend' */

interface DashboardStatsProp {
  ordersDataLoading: boolean
  ordersData: OrdersWithPendingOrderNo | undefined
  productsLoading: boolean
  products: Product[] | undefined
}

function DashboardStats({
  ordersDataLoading,
  ordersData,
  productsLoading,
  products,
}: DashboardStatsProp) {
  const availableAmount = ordersData?.orders
    ?.filter((order) => order.status == 'delivered')
    .reduce((sum, order) => {
      return sum + order.amount * order.price
    }, 0)
  const pendingAmount = ordersData?.orders
    ?.filter((order) => order.status !== 'delivered')
    .reduce((sum, order) => {
      return sum + order.amount * order.price
    }, 0)
  /* const revenueTrend = ordersTrend?.map((d) => {
    return { value: d.order_amount_added }
  }) */
  const activeProducts = products?.filter((product) => product.stock !== 0)
  /* const productTrend = productsTrend?.map((d) => {
    return { value: d.products_added }
  }) */
  /* const pendingOrderTrend = ordersTrend?.map((d) => {
    return { value: d.order_items_added }
  })  */
  const stat = [
    {
      title: 'Available Balance',
      icon: <GiMoneyStack className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: currencyFormatter(availableAmount ?? 0),
      /* trend: revenueTrend,
      trendLoading: ordersTrendLoading, */
    },
    {
      title: 'Pending Balance',
      icon: <MdAccessTime className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: currencyFormatter(pendingAmount ?? 0),
      /* trend: revenueTrend,
      trendLoading: ordersTrendLoading, */
    },
    {
      title: 'Active Products',
      icon: <Package className="h-4 w-4" />,
      loading: productsLoading,
      value: padNumber(activeProducts?.length) ?? 0,
      /* trend: productTrend,
      trendLoading: productsTrendLoading, */
    },
    {
      title: 'Pending Orders',
      icon: <MdOutlinePendingActions className="h-4 w-4" />,
      loading: ordersDataLoading,
      value: padNumber(ordersData?.pendingOrdersLength) ?? 0,
      /* trend: pendingOrderTrend,
      trendLoading: ordersTrendLoading, */
    },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stat.map(({ title, icon, loading, value }, index) => {
        return (
          <Card key={index} className="space-y-0">
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

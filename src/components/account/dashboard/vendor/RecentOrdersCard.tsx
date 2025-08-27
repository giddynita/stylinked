import { VendorRecentOrdersSkeleton } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import Orders from './Orders'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import type { OrdersWithPendingOrderNo } from '@/utils/types'
import { nullSuspense } from '@/utils/suspense'
import { lazy } from 'react'

interface RecentOrdersCardProp {
  ordersData: OrdersWithPendingOrderNo | undefined
  ordersDataLoading: boolean
  isError: boolean
}
const NoResult = lazy(() => import('@/components/global/NoResult'))

function RecentOrdersCard({
  ordersData,
  ordersDataLoading,
  isError,
}: RecentOrdersCardProp) {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="flex items-center gap-4 justify-between text-sm font-semibold">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg w-max">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            Recent Orders from Your Store
          </div>
          <Button asChild size="sm" className="cursor-pointer">
            <Link to="/account/orders">View all</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ordersDataLoading ? (
          <VendorRecentOrdersSkeleton />
        ) : (
          <>
            <Orders data={ordersData?.sortedGroupedOrders} />
            {nullSuspense(
              <>
                {ordersData?.orders?.length == 0 && (
                  <NoResult
                    isError={isError}
                    errorText="your recent orders"
                    icon={ShoppingBag}
                    text="No recent orders found"
                  />
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default RecentOrdersCard

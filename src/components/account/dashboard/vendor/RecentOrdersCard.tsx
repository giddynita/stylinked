import { RecentOrdersSkeleton } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import Orders from './Orders'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { NoResult } from '@/components/global'
import type { OrdersWithPendingOrderNo } from '@/utils/types'

interface RecentOrdersCardProp {
  ordersData: OrdersWithPendingOrderNo | undefined
  ordersDataLoading: boolean
}

function RecentOrdersCard({
  ordersData,
  ordersDataLoading,
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
          <Button asChild size="sm">
            <Link to="/account/orders">View all</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ordersDataLoading ? (
          <RecentOrdersSkeleton />
        ) : (
          <>
            <Orders data={ordersData?.sortedGroupedOrders} />
            <NoResult
              length={ordersData?.orders.length}
              icon={ShoppingBag}
              text="No recent orders found"
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default RecentOrdersCard

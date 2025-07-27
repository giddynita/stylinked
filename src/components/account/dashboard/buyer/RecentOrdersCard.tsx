import { BuyerRecentOrdersSkeleton } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { NoResult } from '@/components/global'
import type { OrdersByBuyer } from '@/utils/types'
import Orders from './Orders'

interface RecentOrdersCardProp {
  ordersData: OrdersByBuyer | undefined
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
            Recent Orders
          </div>
          <Button asChild size="sm" className="cursor-pointer">
            <Link to="/account/orders">View all</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ordersDataLoading ? (
          <BuyerRecentOrdersSkeleton />
        ) : (
          <>
            <Orders sortedOrders={ordersData?.sortedOrders} />
            <NoResult
              length={ordersData?.sortedOrders?.length}
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

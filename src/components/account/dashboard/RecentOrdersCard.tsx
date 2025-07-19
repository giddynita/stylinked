import { OrdersSkeleton } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVendorOrders } from '@/utils/hooks'
import { ShoppingCart } from 'lucide-react'
import Orders from './Orders'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import NoResult from './NoResult'

function RecentOrdersCard() {
  const { data, isLoading } = useVendorOrders()

  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="flex items-center gap-4 justify-between text-sm font-semibold">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg w-max">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            Recent Orders from Your Store
          </div>
          <Button asChild size="sm">
            <Link to="/account/orders">View all</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <OrdersSkeleton />
        ) : (
          <>
            <Orders data={data?.sortedGroupedOrders} />
            <NoResult
              length={data?.orders.length}
              icon={ShoppingCart}
              text="No recent orders found"
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default RecentOrdersCard

import { useBuyerOrders } from '@/utils/hooks'
import DashboardStats from './DashboardStats'
import RecentOrdersCard from './RecentOrdersCard'
import type { User } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'

function BuyerDashboard() {
  const { user }: { user: User } = useSelector((state: any) => state.userState)
  const {
    data: ordersData,
    isLoading: ordersDataLoading,
    isError: orderDataError,
  } = useBuyerOrders(user)
  return (
    <div className="space-y-6 my-6">
      <DashboardStats
        ordersData={ordersData}
        ordersDataLoading={ordersDataLoading}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentOrdersCard
          ordersData={ordersData}
          ordersDataLoading={ordersDataLoading}
          isError={orderDataError}
        />
      </div>
    </div>
  )
}
export default BuyerDashboard

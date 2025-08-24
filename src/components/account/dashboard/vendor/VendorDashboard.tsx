import { useSelector } from 'react-redux'
import {
  useVendorOrders,
  useVendorOrdersTrend,
  useVendorProducts,
  useVendorProductTrend,
} from '@/utils/hooks'
import DashboardStats from './DashboardStats'
import RecentOrdersCard from './RecentOrdersCard'
import LowStockCard from './LowStockCard'
import type { User } from '@supabase/supabase-js'

function VendorDashboard() {
  const { user }: { user: User } = useSelector((state: any) => state.userState)
  const { data: products, isLoading: productsLoading } = useVendorProducts()
  const { data: ordersData, isLoading: ordersDataLoading } =
    useVendorOrders(user)
  const { data: ordersTrend, isLoading: ordersTrendLoading } =
    useVendorOrdersTrend()
  const { data: productsTrend, isLoading: productsTrendLoading } =
    useVendorProductTrend()

  return (
    <div className="space-y-6 my-6">
      {/* Stats Grid */}
      <DashboardStats
        ordersData={ordersData}
        ordersDataLoading={ordersDataLoading}
        products={products}
        productsLoading={productsLoading}
        ordersTrend={ordersTrend}
        ordersTrendLoading={ordersTrendLoading}
        productsTrend={productsTrend}
        productsTrendLoading={productsTrendLoading}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <RecentOrdersCard
          ordersData={ordersData}
          ordersDataLoading={ordersDataLoading}
        />
        {/* Low Stock Alert */}
        {<LowStockCard products={products} productsLoading={productsLoading} />}
      </div>
    </div>
  )
}
export default VendorDashboard

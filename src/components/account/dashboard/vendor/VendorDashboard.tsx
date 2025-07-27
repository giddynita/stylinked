import {
  useVendorOrders,
  useVendorOrdersTrend,
  useVendorProducts,
  useVendorProductTrend,
} from '@/utils/hooks'
import DashboardStats from './DashboardStats'
import RecentOrdersCard from './RecentOrdersCard'
import LowStockCard from './LowStockCard'

function VendorDashboard() {
  const { data: products, isLoading: productsLoading } = useVendorProducts()
  const { data: ordersData, isLoading: ordersDataLoading } = useVendorOrders()
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
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Orders */}
        <RecentOrdersCard
          ordersData={ordersData}
          ordersDataLoading={ordersDataLoading}
        />
        {/* Low Stock Alert */}
        <LowStockCard products={products} productsLoading={productsLoading} />
      </div>
    </div>
  )
}
export default VendorDashboard

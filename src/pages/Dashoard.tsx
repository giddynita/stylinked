import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AccountPagesHeading } from '@/components/headings'
import { GiMoneyStack } from 'react-icons/gi'
import { LuPackageCheck } from 'react-icons/lu'
import { MdOutlinePendingActions } from 'react-icons/md'
import {
  OrdersSkeleton,
  StatSkeleton,
  StockAlertSkeleton,
} from '@/components/skeletons'
import { currencyFormatter, padNumber } from '@/utils/format'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: 12847,
      /* change: '+8.2%', */
      /* trend: 'up', */
      icon: GiMoneyStack,
    },
    {
      title: 'Active Products',
      value: 143,
      /* change: '+12', */
      /* trend: 'up', */
      icon: LuPackageCheck,
    },
    {
      title: 'Pending Orders',
      value: 3,
      /* change: '-5', */
      /* trend: 'down', */
      icon: MdOutlinePendingActions,
    },
  ]
  //recent orders == processing orders
  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'Alice Johnson',
      status: 'Processing',
      amount: 8999,
    },
    {
      id: '#ORD-002',
      customer: 'Bob Smith',
      status: 'Shipped',
      amount: 15450,
    },
    {
      id: '#ORD-003',
      customer: 'Carol Davis',
      status: 'Delivered',
      amount: 6725,
    },
    {
      id: '#ORD-004',
      customer: 'David Wilson',
      status: 'Pending',
      amount: 29999,
    },
  ]
  //low stock products == less than 20% of initial quantity
  const lowStockProducts = [
    { name: 'Wireless Headphones', stock: 3, threshold: 10 },
    { name: 'Smart Watch', stock: 1, threshold: 5 },
    { name: 'Phone Case', stock: 7, threshold: 15 },
  ]

  return (
    <div className="space-y-6">
      <AccountPagesHeading
        pageTitle="Dashboard"
        pageDesc="Your business metrics at a glance"
      />
      {/* Stats Grid */}
      <Suspense fallback={<StatSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.title.includes('Revenue')
                    ? currencyFormatter(stat.value)
                    : padNumber(stat.value)}
                </div>
                {/* <p
                className={`text-xs flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {stat.change} from last month
              </p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest customer orders requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<OrdersSkeleton />}>
              <div className="space-y-4 ">
                {recentOrders &&
                  recentOrders
                    .filter((order) => order.status == 'Processing')
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-row items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-medium leading-none">
                            {order.id}
                          </p>
                          <p className="text-sm text-muted-foreground font-medium">
                            {order.customer}
                          </p>
                        </div>
                        <div className="text-right space-y-0">
                          <p className="text-xs font-medium">
                            {currencyFormatter(order.amount)}
                          </p>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
              </div>
            </Suspense>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Products running low on inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<StockAlertSkeleton />}>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-muted-foreground">
                        {product.stock}/{product.threshold}
                      </span>
                    </div>
                    <Progress
                      value={(product.stock / product.threshold) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

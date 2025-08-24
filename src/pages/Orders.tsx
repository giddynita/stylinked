import { SearchBar } from '@/components/account'
import { AccountPagesHeading } from '@/components/headings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { useBuyerOrders, useVendorOrders } from '@/utils/hooks'
import { accountPageSuspense } from '@/utils/suspense'
import type { UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { lazy, useState } from 'react'
import { useSelector } from 'react-redux'

const BuyerOrders = lazy(
  () => import('@/components/account/orders/buyer/BuyerOrders')
)
const VendorOrders = lazy(
  () => import('@/components/account/orders/vendor/VendorOrders')
)

function Orders() {
  const { user, userRole }: { user: User; userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const [searchQuery, setSearchQuery] = useState('')
  const pageDesc: Record<
    string,
    {
      subtitle: string
      searchPlaceholder: string
    }
  > = {
    buyer: {
      subtitle: 'Track and manage your order history',
      searchPlaceholder: 'Search by order ID, product name or vendor name...',
    },
    vendor: {
      subtitle: 'Manage and track all customer orders in one place',
      searchPlaceholder: 'Search by order ID or customer name...',
    },
  }
  const subtitle = pageDesc[userRole.role].subtitle
  const searchPlaceholder = pageDesc[userRole.role].searchPlaceholder

  const {
    data: orders,
    isLoading,
    isError,
  } = userRole.role === 'buyer' ? useBuyerOrders(user) : useVendorOrders(user)

  const roleComponents: Record<
    string,
    React.ComponentType<{
      searchQuery: string
      isLoading: boolean
      isError: boolean
      orders: any
    }>
  > = {
    buyer: BuyerOrders,
    vendor: VendorOrders,
  }

  const OrderComponent = roleComponents[userRole.role]

  return (
    <>
      <AccountPagesHeading pageTitle="Orders" pageDesc={subtitle} />
      <div className="my-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder={searchPlaceholder}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              {accountPageSuspense(
                <OrderComponent
                  searchQuery={searchQuery}
                  isError={isError}
                  isLoading={isLoading}
                  orders={orders}
                />
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default Orders

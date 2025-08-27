import { lazy, Suspense, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { AccountPagesHeading } from '@/components/headings'
import { ProductListSkeleton } from '@/components/skeletons'
import { useVendorProducts } from '@/utils/hooks'
import { ProductTableHeader, SearchBar } from '@/components/account'
import { accountPageSuspense, nullSuspense } from '@/utils/suspense'
import { useSelector } from 'react-redux'
import type { User } from '@supabase/supabase-js'
const ProductTableBody = lazy(
  () => import('@/components/account/products/ProductTableBody')
)
const NoProduct = lazy(() => import('@/components/account/products/NoProduct'))
const AddProductDialog = lazy(
  () => import('@/components/account/products/AddProductDialog')
)

const Products = () => {
  const { user }: { user: User } = useSelector((state: any) => state.userState)
  const [searchQuery, setSearchQuery] = useState('')
  const { data: products, isLoading, isError } = useVendorProducts(user?.id)
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6 justify-between ">
        <div>
          <AccountPagesHeading
            pageTitle="Products"
            pageDesc="Manage your products here. Add, edit, or delete items from inventory."
          />
        </div>
        <Suspense fallback={<div className="w-32 h-12" />}>
          <AddProductDialog />
        </Suspense>
      </div>
      <Card>
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search by product name..."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            {accountPageSuspense(
              <Table>
                <ProductTableHeader />
                {isLoading ? (
                  <ProductListSkeleton />
                ) : (
                  <TableBody className="text-xs font-medium">
                    <ProductTableBody filteredProducts={filteredProducts} />
                  </TableBody>
                )}
              </Table>
            )}

            {nullSuspense(
              <NoProduct
                searchQuery={searchQuery}
                filteredProducts={filteredProducts}
                isError={isError}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products

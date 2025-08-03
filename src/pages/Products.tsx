import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { AccountPagesHeading } from '@/components/headings'
import { ProductListSkeleton } from '@/components/skeletons'
import { useVendorProducts } from '@/utils/hooks'
import {
  AddProductDialog,
  NoProduct,
  ProductTableBody,
  ProductTableHeader,
  SearchBar,
} from '@/components/account'

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: products, isLoading } = useVendorProducts()
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

        <AddProductDialog />
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
            <NoProduct
              searchQuery={searchQuery}
              filteredProducts={filteredProducts}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products

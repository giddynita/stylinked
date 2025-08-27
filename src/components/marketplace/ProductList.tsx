import type { ProductWithRating } from '@/utils/types'
import ProductListCard from './ProductListCard'
import { nullSuspense } from '@/utils/suspense'
import { Package } from 'lucide-react'
import { lazy } from 'react'

interface ProductListProp {
  sortedProducts: ProductWithRating[] | undefined
  isError: boolean
}
const NoResult = lazy(() => import('@/components/global/NoResult'))

function ProductList({ sortedProducts, isError }: ProductListProp) {
  return (
    <div className="space-y-4">
      {sortedProducts?.map((product) => (
        <ProductListCard key={product.id} product={product} />
      ))}
      {nullSuspense(
        <>
          {sortedProducts?.length == 0 && (
            <NoResult
              isError={isError}
              errorText="products"
              icon={Package}
              text="No products found. Try adjusting your search and filter criteria."
            />
          )}
        </>
      )}
    </div>
  )
}
export default ProductList

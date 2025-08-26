import type { ProductWithRating } from '@/utils/types'
import ProductGridCard from './ProductGridCard'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'
import { Package } from 'lucide-react'

interface ProductGridProp {
  sortedProducts: ProductWithRating[] | undefined
  isError: boolean
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))
const NoResult = lazy(() => import('@/components/global/NoResult'))
function ProductGrid({ sortedProducts, isError }: ProductGridProp) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sortedProducts?.map((product) => (
        <ProductGridCard key={product.id} product={product} />
      ))}
      {nullSuspense(
        <>
          <FetchingError isError={isError} text="products" />

          <NoResult
            length={sortedProducts?.length}
            icon={Package}
            text="No products found. Try adjusting your search and filter criteria."
          />
        </>
      )}
    </div>
  )
}
export default ProductGrid

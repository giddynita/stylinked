import type { ProductWithRating } from '@/utils/types'
import ProductListCard from './ProductListCard'
import { nullSuspense } from '@/utils/suspense'
import { Package } from 'lucide-react'
import { lazy } from 'react'

interface ProductListProp {
  sortedProducts: ProductWithRating[] | undefined
  isError: boolean
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))
const NoResult = lazy(() => import('@/components/global/NoResult'))

function ProductList({ sortedProducts, isError }: ProductListProp) {
  return (
    <div className="space-y-4">
      {sortedProducts?.map((product) => (
        <ProductListCard key={product.id} product={product} />
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
export default ProductList

import type { ProductWithRating } from '@/utils/types'
import ProductListCard from './ProductListCard'

interface ProductListProp {
  sortedProducts: ProductWithRating[] | undefined
}

function ProductList({ sortedProducts }: ProductListProp) {
  return (
    <div className="space-y-4">
      {sortedProducts?.map((product) => (
        <ProductListCard key={product.id} product={product} />
      ))}
    </div>
  )
}
export default ProductList

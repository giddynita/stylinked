import type { ProductWithRating } from '@/utils/types'
import ProductGridCard from './ProductGridCard'

function ProductGrid({
  sortedProducts,
}: {
  sortedProducts: ProductWithRating[] | undefined
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sortedProducts?.map((product) => (
        <ProductGridCard key={product.id} product={product} />
      ))}
    </div>
  )
}
export default ProductGrid

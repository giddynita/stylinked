import type { Product } from '@/utils/types'
import ProductListCard from './ProductListCard'

function ProductList({
  sortedProducts,
}: {
  sortedProducts: Product[] | undefined
}) {
  return (
    <div className="space-y-4">
      {sortedProducts?.map((product) => (
        <ProductListCard key={product.id} product={product} />
      ))}
    </div>
  )
}
export default ProductList

import { NoResult } from '@/components/global'
import type { Product } from '@/utils/types'
import { Package } from 'lucide-react'
import AddProductDialog from './AddProductDialog'

interface NoProductProp {
  searchQuery: string
  filteredProducts: Product[] | undefined
  isError: boolean
}

function NoProduct({ searchQuery, filteredProducts, isError }: NoProductProp) {
  return (
    <div className="font-bold text-2xl w-max mx-auto">
      {searchQuery ? (
        filteredProducts?.length == 0 && (
          <NoResult
            isError={isError}
            errorText="your products"
            text="No results"
            icon={Package}
          />
        )
      ) : (
        <>
          {filteredProducts?.length == 0 && (
            <div className="space-y-6 py-8">
              <p>You have not added any product.</p>
              <AddProductDialog />
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default NoProduct

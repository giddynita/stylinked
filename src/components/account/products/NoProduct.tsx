import NoResult from '@/components/global/NoResult'
import { nullSuspense } from '@/utils/suspense'
import type { Product } from '@/utils/types'
import { Package } from 'lucide-react'
import { lazy } from 'react'

interface NoProductProp {
  searchQuery: string
  filteredProducts: Product[] | undefined
  isError: boolean
}

const AddProductDialog = lazy(
  () => import('@/components/account/products/AddProductDialog')
)

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
            <div className="space-y-4 py-12 text-center">
              <p>You have not added any product.</p>
              {nullSuspense(<AddProductDialog />)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default NoProduct

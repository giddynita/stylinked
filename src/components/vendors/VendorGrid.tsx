import type { VendorCard } from '@/utils/types'
import VendorGridCard from './VendorGridCard'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'
import { Users } from 'lucide-react'

interface VendorGridProp {
  sortedVendors: VendorCard[] | undefined
  isError: boolean
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))
const NoResult = lazy(() => import('@/components/global/NoResult'))

function VendorGrid({ sortedVendors, isError }: VendorGridProp) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedVendors?.map((vendor) => (
        <VendorGridCard key={vendor.id} {...vendor} />
      ))}
      {nullSuspense(
        <>
          <FetchingError isError={isError} text="vendors" />
          <NoResult
            length={sortedVendors?.length}
            icon={Users}
            text="No vendors found. Try adjusting your search and filter criteria."
          />
        </>
      )}
    </div>
  )
}
export default VendorGrid

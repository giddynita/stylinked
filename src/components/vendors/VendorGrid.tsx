import type { VendorCard } from '@/utils/types'
import VendorGridCard from './VendorGridCard'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'
import { Users } from 'lucide-react'

interface VendorGridProp {
  sortedVendors: VendorCard[] | undefined
  isError: boolean
}
const NoResult = lazy(() => import('@/components/global/NoResult'))

function VendorGrid({ sortedVendors, isError }: VendorGridProp) {
  return (
    <>
      {nullSuspense(
        <>
          {sortedVendors?.length == 0 && (
            <NoResult
              isError={isError}
              errorText="vendors"
              icon={Users}
              text="No vendors found. Try adjusting your search and filter criteria."
            />
          )}
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedVendors?.map((vendor) => (
          <VendorGridCard key={vendor.id} {...vendor} />
        ))}
      </div>
    </>
  )
}
export default VendorGrid

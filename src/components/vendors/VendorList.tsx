import type { VendorCard } from '@/utils/types'
import VendorListCard from './VendorListCard'
import { lazy } from 'react'
import { nullSuspense } from '@/utils/suspense'
import { Users } from 'lucide-react'

interface VendorListProp {
  sortedVendors: VendorCard[] | undefined
  isError: boolean
}

const FetchingError = lazy(() => import('@/components/global/FetchingError'))
const NoResult = lazy(() => import('@/components/global/NoResult'))

function VendorList({ sortedVendors, isError }: VendorListProp) {
  return (
    <div className="space-y-4">
      {sortedVendors?.map((vendor) => (
        <VendorListCard key={vendor.id} {...vendor} />
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
export default VendorList

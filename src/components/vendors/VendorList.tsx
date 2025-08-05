import type { VendorCard } from '@/utils/types'
import VendorListCard from './VendorListCard'

interface VendorListProp {
  sortedVendors: VendorCard[] | undefined
}

function VendorList({ sortedVendors }: VendorListProp) {
  return (
    <div className="space-y-4">
      {sortedVendors?.map((vendor) => (
        <VendorListCard key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}
export default VendorList

import type { VendorCardProp } from '@/utils/types'
import VendorListCard from './VendorListCard'

function VendorList({
  sortedVendors,
}: {
  sortedVendors: VendorCardProp[] | undefined
}) {
  return (
    <div className="space-y-4">
      {sortedVendors?.map((vendor) => (
        <VendorListCard key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}
export default VendorList

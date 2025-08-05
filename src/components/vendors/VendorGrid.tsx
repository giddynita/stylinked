import type { VendorCard } from '@/utils/types'
import VendorGridCard from './VendorGridCard'

interface VendorGridProp {
  sortedVendors: VendorCard[] | undefined
}

function VendorGrid({ sortedVendors }: VendorGridProp) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedVendors?.map((vendor) => (
        <VendorGridCard key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}
export default VendorGrid

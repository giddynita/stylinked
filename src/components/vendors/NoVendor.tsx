import type { VendorCardProp } from '@/utils/types'
import { Users } from 'lucide-react'

function NoVendor({
  sortedVendors,
}: {
  sortedVendors: VendorCardProp[] | undefined
}) {
  return (
    <>
      {sortedVendors?.length === 0 && (
        <div className="text-foreground text-center py-12">
          <Users className="w-12 h-12 mx-auto opacity-50 mb-4" />
          <p className="text-lg">No vendors found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria.
          </p>
        </div>
      )}
    </>
  )
}
export default NoVendor

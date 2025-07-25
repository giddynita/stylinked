import { ProductReviews, ViewModeToggle } from '@/components/global'
import SubPagesHeader from '@/components/headers/SubPagesHeader'
import { ProductGrid, ProductList } from '@/components/marketplace'
import {
  ProductGridCardSkeleton,
  ProductListCardSkeleton,
} from '@/components/skeletons'
import VendorProfileCardSkeleton from '@/components/skeletons/VendorProfileCardSkeleton'
import { ProfileCard, SortingProfileProducts } from '@/components/vendors'
import { useVendorProfile } from '@/utils/hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('product-view-mode') as ViewMode) || 'grid'

const VendorProfile = () => {
  const { vendorid } = useParams()
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<ViewMode>(getViewMode)

  const handleViewMode = (mode: ViewMode) => {
    localStorage.setItem('product-view-mode', mode)
    setViewMode(mode)
  }

  //fetch vendor data
  const { data: vendorProfile, isLoading } = useVendorProfile(vendorid)

  // products by this vendor
  const sortedProducts =
    vendorProfile &&
    vendorProfile.vendorProducts.flat().sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.averageRating - a.averageRating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return parseInt(b.created) - parseInt(a.created)
        default:
          return 0
      }
    })
  //reviews by this vendor

  const reviews = vendorProfile?.vendorReviews

  let productView
  if (isLoading) {
    productView =
      viewMode === 'grid' ? (
        <ProductGridCardSkeleton />
      ) : (
        <ProductListCardSkeleton />
      )
  } else {
    productView =
      viewMode === 'grid' ? (
        <ProductGrid sortedProducts={sortedProducts} />
      ) : (
        <ProductList sortedProducts={sortedProducts} />
      )
  }
  return (
    <div className="min-h-screen container">
      {/* Header */}
      <SubPagesHeader
        previousPage="vendors"
        currentPage={vendorProfile?.businessname}
      />

      <div className="space-y-8 pb-12">
        {/* Vendor Header */}
        <section>
          {isLoading ? (
            <VendorProfileCardSkeleton />
          ) : (
            <ProfileCard vendorProfile={vendorProfile} />
          )}
        </section>

        {/* Vendor Products */}
        <section>
          {!isLoading && (
            <h2 className="text-lg font-bold text-foreground mb-5">
              Products by {vendorProfile?.businessname} (
              {vendorProfile?.totalProducts})
            </h2>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <SortingProfileProducts sortBy={sortBy} setSortBy={setSortBy} />
            <ViewModeToggle
              viewMode={viewMode}
              handleViewMode={handleViewMode}
            />
          </div>
          <section>{productView}</section>
        </section>

        {/* Reviews Section */}
        <section>
          <ProductReviews reviews={reviews} displayProductName />
        </section>
      </div>
    </div>
  )
}

export default VendorProfile

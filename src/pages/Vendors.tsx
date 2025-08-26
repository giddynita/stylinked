import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import AppHeader from '@/components/headers/AppHeader'
import { Separator } from '@/components/ui/separator'
import { SearchBar, Sorting, ViewModeToggle } from '@/components/global'
import { useVendorsWithStats } from '@/utils/hooks'
import {
  VendorGridCardSkeleton,
  VendorListCardSkeleton,
} from '@/components/skeletons'
import { PageHeading, QueryHeading } from '@/components/headings'
import { vendorSorting } from '@/utils/data'
import { sectionSuspense } from '@/utils/suspense'
import LazyLoad from 'react-lazyload'

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('vendor-view-mode') as ViewMode) || 'grid'

const CityFilter = lazy(() => import('@/components/vendors/CityFilter'))
const StateFilter = lazy(() => import('@/components/vendors/StateFilter'))
const CustomPagination = lazy(
  () => import('@/components/global/CustomPagination')
)
const VendorGrid = lazy(() => import('@/components/vendors/VendorGrid'))
const VendorList = lazy(() => import('@/components/vendors/VendorList'))

const Vendors = () => {
  //states
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<ViewMode>(getViewMode)
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [filters, setFilters] = useState({
    searchQuery,
    selectedState,
    selectedCity,
  })
  const [currentPage, setCurrentPage] = useState(1)

  //functions
  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedCity('')
  }
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
  }
  const clearFilter = () => {
    setSelectedCity('')
    setSelectedState('')
    setFilters({
      searchQuery,
      selectedCity: '',
      selectedState: '',
    })
  }
  const handleSearchQuery: (searchQuery: string) => void = (searchQuery) => {
    setFilters({ ...filters, searchQuery })
  }
  const handlePageChange: (page: number) => void = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleViewMode = (mode: ViewMode) => {
    localStorage.setItem('product-view-mode', mode)
    setViewMode(mode)
  }
  const handleFilter = () => {
    setFilters({
      searchQuery,
      selectedCity,
      selectedState: selectedState === 'all' ? '' : selectedState,
    })
  }
  const itemsPerPage = 12
  //fetch filtered vendors
  const { data, isLoading, isError } = useVendorsWithStats(
    currentPage,
    itemsPerPage,
    filters
  )

  const filteredVendors = data?.vendors.filter(
    (vendor) => vendor.totalProducts >= 1
  )
  const totalPages =
    filteredVendors && Math.ceil(filteredVendors.length / itemsPerPage)
  const sortedVendors =
    filteredVendors &&
    filteredVendors.flat().sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.totalReviews - a.totalReviews
        case 'newest':
          return parseInt(b.joinedDate) - parseInt(a.joinedDate)
        case 'products':
          return b.totalProducts - a.totalProducts
        default:
          return 0
      }
    })

  let vendorView
  if (isLoading) {
    vendorView =
      viewMode === 'grid' ? (
        <VendorGridCardSkeleton />
      ) : (
        <VendorListCardSkeleton />
      )
  } else {
    vendorView =
      viewMode === 'grid' ? (
        <VendorGrid sortedVendors={sortedVendors} isError={isError} />
      ) : (
        <VendorList sortedVendors={sortedVendors} isError={isError} />
      )
  }

  return (
    <>
      <PageHeading
        pageDesc="Find and connect with vendors who meet your needs."
        pageTitle="Vendors"
      />

      <AppHeader />

      <main className="min-h-screen container space-y-10 mt-12 mb-18">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Discover Vendors
          </h1>
          <p className="text-muted-foreground">
            Find and connect with vendors who meet your needs.
          </p>
        </section>

        <div className="bg-card rounded-lg border p-4 grid gap-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchQuery={handleSearchQuery}
            placeholder="Search vendors by name..."
          />
          <Separator />
          <div className="grid sm:grid-cols-2 md:grid-cols-4  gap-4">
            <Suspense fallback={<div />}>
              <StateFilter
                selectedState={selectedState}
                handleStateChange={handleStateChange}
              />
            </Suspense>
            <Suspense fallback={<div />}>
              <CityFilter
                selectedCity={selectedCity}
                selectedState={selectedState}
                handleCityChange={handleCityChange}
              />
            </Suspense>

            <Button variant="outline" onClick={clearFilter}>
              Clear Filter
            </Button>
            <Button onClick={handleFilter} disabled={isLoading}>
              Apply Filter
            </Button>
          </div>
        </div>
        <section>
          <QueryHeading
            query={filters.searchQuery}
            queryResult={sortedVendors}
            type="vendor"
          />

          <div className=" flex items-start justify-between gap-4 mb-8">
            <Sorting
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={vendorSorting}
            />
            <ViewModeToggle
              viewMode={viewMode}
              handleViewMode={handleViewMode}
            />
          </div>

          <>{sectionSuspense(vendorView)}</>
          <LazyLoad>
            <Suspense fallback={null}>
              {sortedVendors && sortedVendors.length >= 1 && totalPages && (
                <CustomPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </Suspense>
          </LazyLoad>
        </section>
      </main>
    </>
  )
}

export default Vendors

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AppHeader from '@/components/headers/AppHeader'
import {
  CityFilter,
  NoVendor,
  Sorting,
  StateFilter,
  VendorGrid,
  VendorList,
} from '@/components/vendors'
import { Separator } from '@/components/ui/separator'
import {
  CustomPagination,
  SearchBar,
  ViewModeToggle,
} from '@/components/global'
import { useVendorsWithStats } from '@/utils/hooks'
import {
  VendorGridCardSkeleton,
  VendorListCardSkeleton,
} from '@/components/skeletons'
import { QueryHeading } from '@/components/headings'

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('vendor-view-mode') as ViewMode) || 'grid'

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
    setSearchQuery('')
    setSelectedCity('')
    setSelectedState('')
    setFilters({
      searchQuery: '',
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
  const itemsPerPage = 3
  //fetch filtered vendors
  const { data, isLoading, isError } = useVendorsWithStats(
    currentPage,
    itemsPerPage,
    filters
  )
  const totalPages = data && Math.ceil(data?.totalCount / itemsPerPage)
  const filteredVendors = data?.vendors
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
        <VendorGrid sortedVendors={sortedVendors} />
      ) : (
        <VendorList sortedVendors={sortedVendors} />
      )
  }

  return (
    <>
      {/* Header */}
      <AppHeader />

      <main className="min-h-screen container space-y-10 my-12">
        {/* Page Header */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Discover Vendors
          </h1>
          <p className="text-muted-foreground">
            Find and connect with vendors who meet your needs.
          </p>
        </section>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-4 grid gap-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchQuery={handleSearchQuery}
            placeholder="Search vendors by name..."
          />
          <Separator />
          <div className="grid sm:grid-cols-2 md:grid-cols-4  gap-4">
            <StateFilter
              selectedState={selectedState}
              handleStateChange={handleStateChange}
            />
            <CityFilter
              selectedCity={selectedCity}
              selectedState={selectedState}
              handleCityChange={handleCityChange}
            />
            <Button variant="outline" onClick={clearFilter}>
              Clear Filter
            </Button>
            <Button onClick={handleFilter} disabled={isLoading}>
              Apply Filter
            </Button>
          </div>
        </div>
        <section>
          {/* Results Header */}
          <QueryHeading
            query={filters.searchQuery}
            queryResult={sortedVendors}
            type="vendor"
          />

          {/*  Sorting &  View Toggle */}
          <div className=" flex items-start justify-between gap-4 mb-8">
            <Sorting sortBy={sortBy} setSortBy={setSortBy} />
            <ViewModeToggle
              viewMode={viewMode}
              handleViewMode={handleViewMode}
            />
          </div>
          {/* View */}
          <>{vendorView}</>

          {/* Pagination */}
          {sortedVendors && sortedVendors.length >= 1 && totalPages && (
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {/*fetching vendors failed */}
          {!isLoading && isError && (
            <div className="text-center py-12">
              <p className="text-lg font-medium">Error fetching vendors.</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          )}

          {/* No result */}
          <NoVendor sortedVendors={sortedVendors} />
        </section>
      </main>
    </>
  )
}

export default Vendors

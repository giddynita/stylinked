import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'
import type { ProductFilter } from '@/utils/types'
import { SearchBar, Sorting, ViewModeToggle } from '@/components/global'
import AppHeader from '@/components/headers/AppHeader'
import {
  ProductGridCardSkeleton,
  ProductListCardSkeleton,
} from '@/components/skeletons'
import { useAllProducts } from '@/utils/hooks'
import { PageHeading, QueryHeading } from '@/components/headings'
import { marketplaceSorting } from '@/utils/data'
import { advancedFilterSuspense, sectionSuspense } from '@/utils/suspense'
import LazyLoad from 'react-lazyload'

const AdvancedFilters = lazy(
  () => import('@/components/marketplace/AdvancedFilters')
)
const CategoriesCarousel = lazy(
  () => import('@/components/marketplace/CategoriesCarousel')
)
const ProductGrid = lazy(() => import('@/components/marketplace/ProductGrid'))
const ProductList = lazy(() => import('@/components/marketplace/ProductList'))

const CustomPagination = lazy(
  () => import('@/components/global/CustomPagination')
)

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('product-view-mode') as ViewMode) || 'grid'

const Marketplace = () => {
  //filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filters, setFilters] = useState<ProductFilter>({
    priceRange: [0, 1000000],
    selectedMaterials: [],
    selectedBrands: [],
    inStockOnly: false,
    minRating: 0,
    searchQuery: '',
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  //sorting
  const [sortBy, setSortBy] = useState('relevance')

  //pagination
  const [currentPage, setCurrentPage] = useState(1)

  //product view mode
  const [viewMode, setViewMode] = useState<ViewMode>(getViewMode)

  const handleViewMode = (mode: ViewMode) => {
    localStorage.setItem('product-view-mode', mode)
    setViewMode(mode)
  }

  const handleSearchQuery: (searchQuery: string) => void = (searchQuery) => {
    setFilters({ ...filters, searchQuery })
    setCurrentPage(1)
  }

  const itemsPerPage = 12
  //fetch filtered products
  const { data, isLoading, isError } = useAllProducts({
    currentPage,
    itemsPerPage,
    filters,
  })
  const maxPrice =
    data && Math.max(...data?.products?.map((product) => product?.price))

  const products = data?.products

  const totalPages = data && Math.ceil(data?.total / itemsPerPage)

  const filteredProducts = products?.filter((product) => {
    const matchesCategory =
      selectedCategory == 'all' || product.category == selectedCategory

    return matchesCategory
  })

  // Sort products
  const sortedProducts =
    filteredProducts &&
    filteredProducts.flat().sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.averageRating - a.averageRating
        default:
          return 0
      }
    })

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
        <ProductGrid sortedProducts={sortedProducts} isError={isError} />
      ) : (
        <ProductList sortedProducts={sortedProducts} isError={isError} />
      )
  }

  const handlePageChange: (page: number) => void = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageHeading
        pageTitle="Marketplace"
        pageDesc="Discover exclusive fashion collections from verified sellers worldwide."
      />
      <AppHeader />
      <main className="container min-h-screen container space-y-2 my-12">
        <section className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Shop Now</h2>
          <p className="text-muted-foreground">
            Browse our marketplace to find what you need.
          </p>
        </section>

        <div className=" lg:grid lg:grid-cols-8 gap-10">
          <div className="hidden lg:block col-span-3 py-8">
            {advancedFilterSuspense(
              <AdvancedFilters
                searchQuery={searchQuery}
                setFilters={setFilters}
                isLoading={isLoading}
                maxPrice={maxPrice}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
          <div className="py-8 col-span-5">
            {/* Enhanced Search and Filters */}
            <div className="mb-8">
              {/* search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearchQuery={handleSearchQuery}
                  placeholder="Search products by name..."
                />
                <Button
                  variant="outline"
                  className="lg:w-auto lg:hidden"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              {/* Advanced Filters */}

              {advancedFilterSuspense(
                showAdvancedFilters && (
                  <div className="lg:hidden">
                    <AdvancedFilters
                      onClose={() => setShowAdvancedFilters(false)}
                      searchQuery={searchQuery}
                      setFilters={setFilters}
                      isLoading={isLoading}
                      maxPrice={maxPrice}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )
              )}
              {/* Category Filters */}
              <Suspense fallback={<div className="h-[34px] w-full" />}>
                <CategoriesCarousel
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </Suspense>
            </div>
            <section>
              {/* Results Header */}
              <QueryHeading
                query={filters.searchQuery}
                queryResult={sortedProducts}
                type="product"
              />
              {/*  Sorting &  View Toggle */}
              <div className="flex items-center justify-between gap-2 mb-8">
                {/* Sort Dropdown */}
                <Sorting
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  options={marketplaceSorting}
                />

                {/* View Mode Toggle */}
                <ViewModeToggle
                  viewMode={viewMode}
                  handleViewMode={handleViewMode}
                />
              </div>

              {/* Products Grid/List */}
              {sectionSuspense(productView)}

              {/* Pagination */}
            </section>
            <LazyLoad>
              <Suspense fallback={null}>
                {sortedProducts && sortedProducts.length >= 1 && totalPages && (
                  <CustomPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                )}
              </Suspense>
            </LazyLoad>
          </div>
        </div>
      </main>
    </>
  )
}

export default Marketplace

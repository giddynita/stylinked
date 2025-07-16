import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SlidersHorizontal } from 'lucide-react'
import {
  AdvancedFilters,
  CategoriesCarousel,
  ProductGrid,
  ProductList,
} from '@/components/marketplace'
import { Label } from '@/components/ui/label'
import type { ProductFilter } from '@/utils/types'
import {
  CustomPagination,
  SearchBar,
  ViewModeToggle,
} from '@/components/global'
import AppHeader from '@/components/headers/AppHeader'
import {
  ProductGridCardSkeleton,
  ProductListCardSkeleton,
} from '@/components/skeletons'
import { useAllProducts } from '@/utils/hooks'
import { QueryHeading } from '@/components/headings'

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('product-view-mode') as ViewMode) || 'grid'

const Marketplace = () => {
  //filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [filters, setFilters] = useState<ProductFilter>({
    priceRange,
    selectedMaterials,
    selectedBrands,
    inStockOnly,
    minRating,
    searchQuery,
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
  }

  const itemsPerPage = 3
  //fetch filtered products
  const { data, isLoading, isError } = useAllProducts({
    currentPage,
    itemsPerPage,
    filters,
  })
  const maxPrice =
    data && Math.max(...data?.products?.map((product) => product?.price))

  //clear filter
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setPriceRange([0, maxPrice ?? 1000000])
    setSelectedMaterials([])
    setSelectedBrands([])
    setInStockOnly(false)
    setMinRating(0)
    setCurrentPage(1)
    setFilters({
      priceRange: [0, 50000],
      selectedMaterials: [],
      selectedBrands: [],
      inStockOnly: false,
      minRating: 0,
    })
  }
  //constants

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
    [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
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
        <ProductGrid sortedProducts={sortedProducts} />
      ) : (
        <ProductList sortedProducts={sortedProducts} />
      )
  }

  const handlePageChange: (page: number) => void = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AppHeader />
      <div className="min-h-screen container lg:grid lg:grid-cols-8 gap-10">
        <section className="hidden lg:block col-span-3 py-8">
          <AdvancedFilters
            priceRange={priceRange}
            selectedMaterials={selectedMaterials}
            selectedBrands={selectedBrands}
            inStockOnly={inStockOnly}
            minRating={minRating}
            searchQuery={searchQuery}
            setPriceRange={setPriceRange}
            setSelectedMaterials={setSelectedMaterials}
            setSelectedBrands={setSelectedBrands}
            setInStockOnly={setInStockOnly}
            setMinRating={setMinRating}
            setFilters={setFilters}
            isLoading={isLoading}
            maxPrice={maxPrice}
          />
        </section>
        <section className="py-8 col-span-5">
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
            {showAdvancedFilters && (
              <div className="lg:hidden">
                <AdvancedFilters
                  onClose={() => setShowAdvancedFilters(false)}
                  priceRange={priceRange}
                  selectedMaterials={selectedMaterials}
                  selectedBrands={selectedBrands}
                  inStockOnly={inStockOnly}
                  minRating={minRating}
                  searchQuery={searchQuery}
                  setPriceRange={setPriceRange}
                  setSelectedMaterials={setSelectedMaterials}
                  setSelectedBrands={setSelectedBrands}
                  setInStockOnly={setInStockOnly}
                  setMinRating={setMinRating}
                  setFilters={setFilters}
                  isLoading={isLoading}
                  maxPrice={maxPrice}
                />
              </div>
            )}
            {/* Category Filters */}
            <CategoriesCarousel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <section>
            {/* Results Header */}
            <QueryHeading
              query={searchQuery}
              queryResult={sortedProducts}
              type="product"
            />
            {/*  Sorting &  View Toggle */}
            <div className="flex items-center justify-between gap-2 mb-8">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <Label className="text-muted-foreground">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="font-medium text-base w-36 sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Average Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <ViewModeToggle
                viewMode={viewMode}
                handleViewMode={handleViewMode}
              />
            </div>

            {/* Products Grid/List */}
            {productView}

            {/* Pagination */}
            {sortedProducts && sortedProducts.length >= 1 && totalPages && (
              <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}

            {/*fetching product failed */}
            {!isLoading && isError && (
              <div className="text-center py-12">
                <p className="text-lg font-medium">Error fetching products.</p>
                <Button
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            )}
            {!isLoading && !isError && !sortedProducts?.length && (
              <div className=" text-center py-12">
                <p className=" text-lg font-medium">
                  No product found matching your criteria.
                </p>
                <Button
                  disabled={isLoading}
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        </section>
      </div>
    </>
  )
}

export default Marketplace

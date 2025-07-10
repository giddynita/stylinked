import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import {
  AdvancedFilters,
  CategoriesCarousel,
  ProductGrid,
  ProductList,
} from '@/components/marketplace'
import { Label } from '@/components/ui/label'
import type { ProductFilter } from '@/utils/types'
import { CustomPagination } from '@/components/global'
import AppHeader from '@/components/headers/AppHeader'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/utils/loader'
import {
  ProductGridCardSkeleton,
  ProductListCardSkeleton,
} from '@/components/skeletons'

type ViewMode = 'grid' | 'list'
const getViewMode =
  (localStorage.getItem('product-view-mode') as ViewMode) || 'grid'

const Marketplace = () => {
  //filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000])
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
    setFilters({ ...filters, searchQuery: searchQuery })
  }

  const itemsPerPage = 3
  const maxPrice = 50000
  //fetch filtered products
  const queryData = {
    queryKey: ['products', currentPage, filters],
    queryFn: () => getProducts({ currentPage, itemsPerPage, filters }),
  }
  const { data, isLoading, isError } = useQuery(queryData)

  //clear filter
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setPriceRange([0, maxPrice])
    setSelectedMaterials([])
    setSelectedBrands([])
    setInStockOnly(false)
    setMinRating(0)
    setCurrentPage(1)
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
          />
        </section>
        <section className="  py-8 col-span-5">
          {/* Enhanced Search and Filters */}
          <section className="mb-8">
            {/* search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={`Search for products...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 outline-none focus-visible:outline-none focus-visible:ring-0 border-r-0 focus:border-r-0 rounded-r-none"
                />

                <Button
                  size="lg"
                  className=" h-12 rounded-l-none sm:px-8 border border-l-none border-primary"
                  onClick={() => handleSearchQuery(searchQuery)}
                >
                  Search
                </Button>
              </div>
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
                />
              </div>
            )}
            {/* Category Filters */}
            <CategoriesCarousel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </section>
          {/* Results Header with View Toggle */}
          <section className="mb-8">
            {searchQuery && sortedProducts && (
              <h2 className="text-2xl text mb-8">
                Result{sortedProducts.length > 1 && 's'} for{' '}
                <span className="font-bold">{searchQuery}</span> (
                {sortedProducts.length})
              </h2>
            )}
            <div className="flex items-center justify-between gap-2">
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
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
          {/* Products Grid/List */}
          <section>{productView}</section>

          {/*   {/* Pagination */}
          {totalPages && sortedProducts && sortedProducts.length > 0 && (
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
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          )}
          {!isLoading && !isError && !sortedProducts?.length && (
            <div className=" text-center py-12">
              <p className=" text-lg font-medium">
                No product found matching your criteria.
              </p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Marketplace

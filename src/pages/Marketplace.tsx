import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import {
  ProductCard,
  AdvancedFilters,
  CategoriesCarousel,
} from '@/components/marketplace'
import { Label } from '@/components/ui/label'
import type { Product } from '@/utils/types'

const Marketplace = () => {
  //filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [filters, setFilters] = useState({
    priceRange,
    selectedMaterials,
    selectedBrands,
    inStockOnly,
    minRating,
  })
  const brandsToFilter = new Set(filters.selectedBrands)

  const materialsToFilter = new Set(filters.selectedBrands)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  //sorting
  const [sortBy, setSortBy] = useState('relevance')

  //pagination
  const [currentPage, setCurrentPage] = useState(1)

  //product view mode
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  //hooks

  //constants
  const itemsPerPage = 12

  const maxPrice = 1000
  // Mock product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Custom Tailored Wedding Dress',
      price: 450,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Elegant Designs',
      rating: 4.8,
      category: 'dresses',
      stock: 3,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
    {
      id: '2',
      name: 'Bespoke Business Suit',
      price: 320,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Sharp Tailors',
      rating: 4.9,
      category: 'suits',
      stock: 3,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
    {
      id: '3',
      name: 'Handcrafted Silk Blouse',
      price: 85,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Silk & Style',
      rating: 4.6,
      category: 'shirts',
      stock: 3,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
    {
      id: '4',
      name: 'Designer Evening Gown',
      price: 650,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Luxury Fashion',
      rating: 4.7,
      category: 'formal wear',
      stock: 3,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
    {
      id: '5',
      name: 'Custom Leather Jacket',
      price: 280,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Urban Craft',
      rating: 4.5,
      category: 'casual wear',
      stock: 3,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
    {
      id: '6',
      name: 'Handmade Bow Tie Collection',
      price: 35,
      images: ['/placeholder.svg?height=300&width=300'],
      vendor: 'Accessory Art',
      rating: 4.4,
      category: 'accessories',
      stock: 2,
      description: '',
      material: '',
      brand: '',
      variants: [
        {
          size: '',
          colors: [
            {
              color: '',
              quantity: 0,
            },
          ],
        },
      ],
      vendorid: '',
      createdat: '',
    },
  ]

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesMaterials =
      materialsToFilter.size === 0 || materialsToFilter.has(product.material)
    const matchesBrand =
      brandsToFilter.size === 0 || brandsToFilter.has(product.brand)
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    const [min, max] = filters.priceRange
    const matchesPriceRange = product.price >= min && product.price <= max

    const matchesInStock = !filters.inStockOnly || product.stock > 0
    const matchesRating = product.rating > filters.minRating

    return (
      matchesSearch &&
      matchesCategory &&
      matchesRating &&
      matchesPriceRange &&
      matchesBrand &&
      matchesMaterials &&
      matchesInStock
    )
  })

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

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // Product Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen container lg:grid lg:grid-cols-8 gap-10">
      <div className="hidden lg:block col-span-3 py-8">
        <AdvancedFilters
          priceRange={priceRange}
          selectedMaterials={selectedMaterials}
          selectedBrands={selectedBrands}
          inStockOnly={inStockOnly}
          minRating={minRating}
          setPriceRange={setPriceRange}
          setSelectedMaterials={setSelectedMaterials}
          setSelectedBrands={setSelectedBrands}
          setInStockOnly={setInStockOnly}
          setMinRating={setMinRating}
          setFilters={setFilters}
        />
      </div>
      <div className="  py-8 col-span-5">
        {/* Enhanced Search and Filters */}
        <div className="mb-8">
          {/* search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 lg:max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={`Search for products...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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
        </div>

        {/* Results Header with View Toggle */}
        {searchQuery && (
          <h2 className="text-2xl text mb-8">
            Result{sortedProducts.length > 1 && 's'} for{' '}
            <span className="font-bold">{searchQuery}</span> (
            {sortedProducts.length})
          </h2>
        )}
        <div className="flex items-center justify-between mb-6">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Label className="text-muted-foreground">Sort by:</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 font-medium text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Average Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {paginatedProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600">{product.vendor}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xl font-bold text-purple-600">
                          ${product.price}
                        </span>
                        <Badge
                          variant={product.stock ? 'default' : 'secondary'}
                        >
                          {product.stock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={
                    currentPage <= 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  className={
                    currentPage >= totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className=" text-lg">No product found matching your criteria.</p>
            <Button className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace

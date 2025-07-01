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
import {
  Search,
  Filter,
  SlidersHorizontal,
  ShoppingCart,
  User,
  Grid3X3,
  List,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard, AdvancedFilters } from '@/components/marketplace'
import { useUserData } from '@/utils/hooks'

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchType, setSearchType] = useState<'products' | 'vendors'>(
    'products'
  )
  //hooks

  const itemsPerPage = 12

  const categories = [
    'all',
    'dresses',
    'suits',
    'shirts',
    'pants',
    'accessories',
    'formal wear',
    'casual wear',
  ]

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: '$0 - $50', value: '0-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$101 - $200', value: '101-200' },
    { label: '$200+', value: '200+' },
  ]

  // Mock product data
  const products = [
    {
      id: '1',
      name: 'Custom Tailored Wedding Dress',
      price: 450,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Elegant Designs',
      rating: 4.8,
      category: 'dresses',
      inStock: true,
    },
    {
      id: '2',
      name: 'Bespoke Business Suit',
      price: 320,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Sharp Tailors',
      rating: 4.9,
      category: 'suits',
      inStock: true,
    },
    {
      id: '3',
      name: 'Handcrafted Silk Blouse',
      price: 85,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Silk & Style',
      rating: 4.6,
      category: 'shirts',
      inStock: false,
    },
    {
      id: '4',
      name: 'Designer Evening Gown',
      price: 650,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Luxury Fashion',
      rating: 4.7,
      category: 'formal wear',
      inStock: true,
    },
    {
      id: '5',
      name: 'Custom Leather Jacket',
      price: 280,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Urban Craft',
      rating: 4.5,
      category: 'casual wear',
      inStock: true,
    },
    {
      id: '6',
      name: 'Handmade Bow Tie Collection',
      price: 35,
      image: '/placeholder.svg?height=300&width=300',
      vendor: 'Accessory Art',
      rating: 4.4,
      category: 'accessories',
      inStock: true,
    },
    // Add more products for pagination demo
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 7}`,
      name: `Fashion Item ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      image: '/placeholder.svg?height=300&width=300',
      vendor: `Vendor ${i + 1}`,
      rating: 4 + Math.random(),
      category:
        categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      inStock: Math.random() > 0.2,
    })),
  ]

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchType === 'products'
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : product.vendor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    const matchesPriceRange =
      priceRange === 'all' ||
      (() => {
        const [min, max] = priceRange.split('-').map((p) => p.replace('+', ''))
        if (max) {
          return (
            product.price >= parseInt(min) && product.price <= parseInt(max)
          )
        } else {
          return product.price >= parseInt(min)
        }
      })()

    return matchesSearch && matchesCategory && matchesPriceRange
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return 0 // Would use actual date if available
      default:
        return 0
    }
  })

  // Pagination
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder={`Search for ${searchType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={searchType}
              onValueChange={(value: 'products' | 'vendors') =>
                setSearchType(value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="vendors">Vendors</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="lg:w-auto"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <AdvancedFilters onClose={() => setShowAdvancedFilters(false)} />
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer capitalize ${
                  selectedCategory === category
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'hover:bg-purple-50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.replace('-', ' ')}
              </Badge>
            ))}
          </div>

          {/* Price Filters */}
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Badge
                key={range.value}
                variant={priceRange === range.value ? 'default' : 'outline'}
                className={`cursor-pointer ${
                  priceRange === range.value
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'hover:bg-purple-50'
                }`}
                onClick={() => setPriceRange(range.value)}
              >
                {range.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Header with View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchType === 'products' ? 'Fashion Products' : 'Vendors'} (
            {sortedProducts.length})
          </h2>

          <div className="flex items-center space-x-4">
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

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                      src={product.image}
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
                          variant={product.inStock ? 'default' : 'secondary'}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
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
            <p className="text-gray-500 text-lg">
              No {searchType} found matching your criteria.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setPriceRange('all')
                setCurrentPage(1)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace

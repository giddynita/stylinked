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
  ProductGridCard,
  ProductListCard,
  CategoriesCarousel,
} from '@/components/marketplace'
import { Label } from '@/components/ui/label'
import type { Product } from '@/utils/types'
import { CustomPagination } from '@/components/global'

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
  const itemsPerPage = 3

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
      stock: 0,
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
    {
      id: '7',
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
    {
      id: '8',
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
    {
      id: '9',
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
    {
      id: '10',
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
    {
      id: '11',
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
    {
      id: '12',
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
    {
      id: '13',
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
    {
      id: '14',
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
    {
      id: '15',
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
    {
      id: '16',
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
    {
      id: '17',
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
    {
      id: '18',
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
    currentPage * itemsPerPage
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
        <div className="flex items-center justify-between gap-2 mb-6">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Label className="text-muted-foreground">Sort by:</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="font-medium text-base w-32 sm:w-48">
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
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {paginatedProducts.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedProducts.length > 0 && (
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
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

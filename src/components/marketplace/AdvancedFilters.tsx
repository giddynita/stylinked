import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'
import { currencyFormatter } from '@/utils/format'
import type { AdvancedFiltersProps } from '@/utils/types'

const AdvancedFilters = ({
  onClose,
  priceRange,
  selectedMaterials,
  selectedBrands,
  inStockOnly,
  minRating,
  searchQuery,
  setPriceRange,
  setSelectedMaterials,
  setSelectedBrands,
  setInStockOnly,
  setMinRating,
  setFilters,
  isLoading,
  maxPrice,
}: AdvancedFiltersProps) => {
  const materials = [
    'Cotton',
    'Silk',
    'Wool',
    'Leather',
    'Polyester',
    'Linen',
    'Cashmere',
  ]
  const brands = [
    'Nike',
    'Adidas',
    'Zara',
    'H&M',
    'Uniqlo',
    "Levi's",
    'Gucci',
    'Under Armour',
    'Puma',
    'Tommy Hilfiger',
    'The North Face',
    'Calvin Klein',
  ]

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material])
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((s) => s !== brand))
    }
  }
  const max = maxPrice && maxPrice > 0 ? maxPrice : 0
  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000000],
      selectedMaterials: [],
      selectedBrands: [],
      inStockOnly: false,
      minRating: 0,
    })
    setPriceRange([0, 1000000])
    setSelectedMaterials([])
    setSelectedBrands([])
    setInStockOnly(false)
    setMinRating(0)
  }

  return (
    <Card className="mb-6 shadow-md bg-background/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Advanced Filters</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {/* Materials */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Materials</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={(checked) =>
                      handleMaterialChange(material, checked as boolean)
                    }
                  />
                  <Label htmlFor={material} className="text-sm">
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {/* Brands */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Brands</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <Label htmlFor={brand} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={max}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currencyFormatter(priceRange[0])}</span>
              <span>{currencyFormatter(max ?? priceRange[1])}</span>
            </div>
          </div>
          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Minimum Rating</Label>
            <Slider
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              max={5}
              step={0.5}
              className="w-full"
            />
            <div className="text-sm text-gray-600">{minRating} stars & up</div>
          </div>

          {/* stock status */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <Label htmlFor="inStock" className="text-sm">
              In stock only
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button disabled={isLoading} variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              setFilters({
                priceRange,
                selectedMaterials,
                selectedBrands,
                inStockOnly,
                minRating,
                searchQuery,
              })
            }}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdvancedFilters

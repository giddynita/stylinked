import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'

interface AdvancedFiltersProps {
  onClose: () => void
}

const AdvancedFilters = ({ onClose }: AdvancedFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const materials = [
    'Cotton',
    'Silk',
    'Wool',
    'Leather',
    'Polyester',
    'Linen',
    'Cashmere',
  ]
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material])
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedMaterials([])
    setSelectedSizes([])
    setInStockOnly(false)
    setMinRating(0)
  }

  return (
    <Card className="mb-6 border-purple-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Advanced Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

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

          {/* Sizes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Sizes</Label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(size, checked as boolean)
                    }
                  />
                  <Label htmlFor={size} className="text-sm">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <Slider
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                max={5}
                step={0.5}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {minRating} stars & up
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={inStockOnly}
                onCheckedChange={(checked) =>
                  setInStockOnly(checked as boolean)
                }
              />
              <Label htmlFor="inStock" className="text-sm">
                In stock only
              </Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdvancedFilters

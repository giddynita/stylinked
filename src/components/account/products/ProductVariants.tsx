import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { colorsList, productSizesList } from '@/utils/data'
import type { ColorQuantity, Variant } from '@/utils/types'
import { useState } from 'react'
import { toast } from 'sonner'
import VariantsAdded from './VariantsAdded'

interface ProductVariantsProp {
  category: keyof typeof productSizesList
  variants: Variant[]
  setVariants: (value: Variant[]) => void
}

function ProductVariants({
  category,
  variants,
  setVariants,
}: ProductVariantsProp) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [colorQuantities, setColorQuantities] = useState<
    Record<string, number>
  >({})

  const handleAddVariant = () => {
    if (!selectedSize || selectedColors.length === 0) {
      toast.warning('Please select a size and at least one color.')
      return
    }
    const newColors: ColorQuantity[] = selectedColors.map((color) => ({
      color,
      quantity: colorQuantities[color] || 1,
    }))

    const updatedVariants = [...variants]
    const existingVariantIndex = updatedVariants.findIndex(
      (v) => v.size === selectedSize
    )

    if (existingVariantIndex !== -1) {
      // Merge into existing variant
      const existingVariant = updatedVariants[existingVariantIndex]
      const colorMap: Record<string, number> = {}

      // Map existing colors
      existingVariant.colors.forEach(({ color, quantity }) => {
        colorMap[color] = quantity
      })

      // Add or merge incoming colors
      newColors.forEach(({ color, quantity }) => {
        if (colorMap[color]) {
          colorMap[color] += quantity
        } else {
          colorMap[color] = quantity
        }
      })

      // Update variant
      updatedVariants[existingVariantIndex] = {
        size: selectedSize,
        colors: Object.entries(colorMap).map(([color, quantity]) => ({
          color,
          quantity,
        })),
      }
    } else {
      // Add new variant
      updatedVariants.push({ size: selectedSize, colors: newColors })
    }

    setVariants(updatedVariants)
    setSelectedSize('')
    setSelectedColors([])
    setColorQuantities({})
  }

  const sizes = productSizesList[category]
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Size</Label>
          <Select
            value={selectedSize}
            onValueChange={(value) => setSelectedSize(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {sizes?.map(({ value, label }, index) => {
                return (
                  <SelectItem key={index} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Color</Label>
          <Select
            value={selectedColors[0] || ''}
            onValueChange={(value) => setSelectedColors(Array.of(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              {colorsList.map(({ value, label }, index) => {
                return (
                  <SelectItem key={index} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedColors.length !== 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedColors.map((color) => (
            <div key={color} className="space-y-2">
              <Label>
                Quantity for <span className="capitalize">{color}</span>{' '}
              </Label>
              <Input
                id="color"
                type="number"
                min="1"
                value={colorQuantities[color] || ''}
                onChange={(e) =>
                  setColorQuantities({
                    ...colorQuantities,
                    [color]: Number(e.target.value),
                  })
                }
                className="px-4"
              />
            </div>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={handleAddVariant}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Add Size & Color
      </Button>
      <VariantsAdded variants={variants} setVariants={setVariants} />
    </>
  )
}
export default ProductVariants

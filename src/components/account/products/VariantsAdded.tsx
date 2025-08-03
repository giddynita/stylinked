import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Variant } from '@/utils/types'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface VariantAddedProp {
  variants: Variant[]
  setVariants: (value: Variant[]) => void
}

function VariantsAdded({ variants, setVariants }: VariantAddedProp) {
  const handleDeleteVariant = (size: string, color: string) => {
    const updated = variants
      .map((variant) => {
        if (variant.size !== size) return variant
        return {
          ...variant,
          colors: variant.colors.filter((c) => c.color !== color),
        }
      })
      .filter((variant) => variant.colors.length > 0) // remove size if no colors left
    setVariants(updated)
  }
  const handleEditVariant = (size: string, color: string, quantity: number) => {
    const updated = variants.map((variant) => {
      if (variant.size == size) {
        return {
          ...variant,
          colors: variant.colors.map((c) =>
            c.color === color ? { ...c, quantity } : c
          ),
        }
      }
      return variant
    })
    setVariants(updated)
  }
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="font-bold text-lg">
          {variants.length == 0
            ? 'No variant added'
            : variants.length > 1
            ? 'Variants Added'
            : 'Variant Added'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {variants.map((variant) => (
          <div
            key={variant.size}
            className="font-medium border py-4 px-2 rounded-lg mb-4  "
          >
            <strong>Size:</strong> {variant.size}
            <ul className="space-y-4">
              {variant.colors.map(({ color, quantity }, index) => (
                <li key={index}>
                  <span className="flex flex-row items-center justify-between gap-4 pl-2">
                    <span className="flex flex-col md:flex-row gap-1 md:gap-4">
                      <span className="capitalize">
                        <strong>Color:</strong> {color}
                      </span>
                      <span className="flex items-center gap-1">
                        <strong>Quantity:</strong>
                        <span className="flex items-center gap-2 border rounded-sm">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 border-r rounded-r-none"
                            onClick={() =>
                              handleEditVariant(
                                variant.size,
                                color,
                                quantity - 1
                              )
                            }
                            disabled={quantity == 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          {quantity}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 border-l rounded-l-none"
                            type="button"
                            onClick={() =>
                              handleEditVariant(
                                variant.size,
                                color,
                                quantity + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </span>
                      </span>
                    </span>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteVariant(variant.size, color)}
                      className="text-red-600 hover:text-red-600"
                    >
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </span>
                  {index < variant.colors.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default VariantsAdded

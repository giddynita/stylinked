import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getUrgencyLevel } from '@/utils/data'
import { currencyFormatter } from '@/utils/format'
import type { Product } from '@/utils/types'
import { Eye } from 'lucide-react'
import { useState } from 'react'

interface ViewProductDialogProp {
  setSelectedProduct: (value: Product | null) => void
  product: Product
  selectedProduct: Product | null
}

function ViewProductDialog({
  setSelectedProduct,
  product,
  selectedProduct,
}: ViewProductDialogProp) {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }
  const urgency = selectedProduct && getUrgencyLevel(selectedProduct.stock)
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className=" w-6 h-6"
              onClick={() => handleViewProduct(product)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-4}>
          View
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>View product information.</DialogDescription>
        </DialogHeader>
        {selectedProduct && (
          <div className="space-y-4">
            <div>
              <Label className="font-semibold text-sm text-muted-foreground">
                Product Name
              </Label>
              <p>{selectedProduct.name}</p>
            </div>

            {selectedProduct.description && (
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Description
                </Label>
                <p>{selectedProduct.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Price
                </Label>
                <p className="text-base">
                  {currencyFormatter(selectedProduct.price)}
                </p>
              </div>
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Category
                </Label>
                <p>{selectedProduct.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Brand
                </Label>
                <p>{selectedProduct.brand}</p>
              </div>
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Material
                </Label>
                <p>{selectedProduct.material}</p>
              </div>
              <div>
                <Label className="font-semibold text-sm text-muted-foreground">
                  Stock
                </Label>
                <p>
                  {selectedProduct.stock} unit
                  {selectedProduct.stock > 1 && 's'}
                </p>
              </div>
            </div>
            {selectedProduct.variants && (
              <div className="space-y-4 grid sm:grid-cols-2">
                {selectedProduct.variants.map((variant) => (
                  <div key={variant.size}>
                    <div className="flex gap-1 text-sm items-center">
                      <Label className="font-semibold  text-muted-foreground">
                        Size:
                      </Label>
                      <p>{variant.size} </p>
                    </div>

                    <ul className="space-y-2">
                      {variant.colors.map((c) => (
                        <li key={c.color} className="space-x-4 pl-2 flex">
                          <span className="flex gap-1 text-sm items-center">
                            <Label className="font-semibold text-muted-foreground">
                              Color:
                            </Label>
                            {c.color}
                          </span>
                          <span className="flex gap-1 text-sm items-center">
                            <Label className="font-semibold  text-muted-foreground">
                              Quantity:
                            </Label>{' '}
                            {c.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-6">
              <Label className="font-semibold text-sm text-muted-foreground mb-2">
                Product Image{selectedProduct.images.length > 1 && 's'}
              </Label>
              <div className=" flex items-center flex-wrap justify-center sm:justify-start place-items-center sm:place-items-start gap-8">
                {selectedProduct.images.map((image, index) => {
                  return (
                    <figure
                      key={index}
                      className="w-[200px] h-[200px] shadow-lg p-4 "
                    >
                      <img
                        src={image}
                        alt={selectedProduct.name}
                        className="w-full object-contain h-full"
                        loading="lazy"
                      />
                    </figure>
                  )
                })}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-sm text-muted-foreground">
                Status
              </Label>
              <Badge className={urgency?.className}>{urgency?.label}</Badge>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default ViewProductDialog

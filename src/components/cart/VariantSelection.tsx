import { DialogDescription } from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useState } from 'react'
import { ImageCarousel } from '../global'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Ban, Edit3, Minus, Plus } from 'lucide-react'
import type { CartItemType, ColorQuantity, Variant } from '@/utils/types'
import { useDispatch } from 'react-redux'
import { addItem, editItem } from '@/features/cart/cartSlice'

interface VariantSelectionProp {
  cartItem: CartItemType
}

function VariantSelection({ cartItem }: VariantSelectionProp) {
  const [variantDialogOpen, setVariantDialogOpen] = useState(false)
  const [editQuantity, setEditQuantity] = useState(cartItem.amount)
  const [editSize, setEditSize] = useState(cartItem.size)
  const [editColor, setEditColor] = useState(cartItem.color)
  const dispatch = useDispatch()

  const sizeCheck = cartItem.availableVariants?.find(
    (p: Variant) => p.size === editSize
  )
  const colorsOfSizeSelected = sizeCheck?.colors.map(
    (p: ColorQuantity) => p.color
  )
  const colorCheck = sizeCheck?.colors.find(
    (p: ColorQuantity) => p.color === editColor
  )
  const product: CartItemType = {
    ...cartItem,
    size: editSize,
    color: editColor,
    amount: editQuantity,
  }
  const updateCartItem = () => {
    dispatch(
      editItem({
        id: cartItem.id,
        size: cartItem.size,
        color: cartItem.color,
        amount: editQuantity,
      })
    )
    setVariantDialogOpen(false)
  }
  const addToCart = () => {
    dispatch(
      addItem({
        product,
      })
    )
    setVariantDialogOpen(false)
  }
  return (
    <Dialog open={variantDialogOpen} onOpenChange={setVariantDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className=" text-sm text-muted-foreground hover:text-primary hover:bg-primary/20 font-medium"
        >
          <Edit3 className="w-3 h-3 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Update Cart Item</DialogTitle>
          <DialogDescription className="sr-only">
            Update Cart item
          </DialogDescription>
        </DialogHeader>
        <section className="space-y-4 pt-4">
          <ImageCarousel carouselItems={cartItem.images} />
          <div className="space-y-2">
            <h3 className="font-medium">{cartItem.name}</h3>
            <p className="text-sm text-muted-foreground">
              Sold by {cartItem.vendor}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Size</Label>
              <div className="flex flex-wrap gap-2">
                {cartItem.availableVariants?.map(
                  ({ size }: { size: string }) => (
                    <Button
                      key={size}
                      variant={editSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setEditSize(size)
                        setEditColor('')
                      }}
                    >
                      {size}
                    </Button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Color</Label>
              <div className="flex flex-wrap gap-2">
                {cartItem.availableVariants?.map(
                  ({ colors }: { colors: ColorQuantity[] }) =>
                    colors.map(({ color, quantity }) => {
                      const colorCheck =
                        !colorsOfSizeSelected?.includes(color) || quantity === 0
                      return (
                        <Button
                          key={color}
                          variant={editColor === color ? 'default' : 'outline'}
                          size="sm"
                          disabled={colorCheck}
                          onClick={() => {
                            setEditColor(color)
                            setEditQuantity(1)
                          }}
                          className="relative"
                        >
                          {color}
                          {quantity === 0 && (
                            <Ban className="w-4 h-4 absolute -top-2 -right-2 text-destructive font-bold bg-destructive/30 rounded-full " />
                          )}
                        </Button>
                      )
                    })
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditQuantity(Math.max(1, editQuantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-20 text-center h-8"
                >
                  {editQuantity}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditQuantity(editQuantity + 1)}
                  disabled={editQuantity == colorCheck?.quantity}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={updateCartItem}
              className="flex-1"
              disabled={
                editSize !== cartItem.size || editColor !== cartItem.color
              }
            >
              Update Item
            </Button>
            {(editSize !== cartItem.size || editColor !== cartItem.color) && (
              <Button onClick={addToCart} variant="outline" className="flex-1">
                Add as New
              </Button>
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
export default VariantSelection

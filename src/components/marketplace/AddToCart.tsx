import { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { GlobalContext } from '@/utils/globalContext'
import type { CartItemType, ProductCardProps } from '@/utils/types'
import { Carousel } from '../global'
import { currencyFormatter } from '@/utils/format'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { addItem } from '@/features/cart/cartSlice'
import { Minus, Plus } from 'lucide-react'

function AddToCart({ product }: ProductCardProps) {
  const { isAddToCartDialogOpen, setIsAddToCartDialogOpen } =
    useContext(GlobalContext)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const sizeCheck = product.variants.find((p) => p.size === selectedSize)
  const colorsOfSizeSelected = sizeCheck?.colors.map((p) => p.color)
  const colorCheck = sizeCheck?.colors.find((p) => p.color === selectedColor)
  console.log(colorCheck)

  const dispatch = useDispatch()
  /* const handleQuantity = (quantity: string) => {
    const parseQuantity = Number(quantity)
    if (colorCheck?.quantity) {
      if (parseQuantity > colorCheck.quantity) {
        toast.warning(
          `Quantity exceed available amount (${colorCheck?.quantity})`
        )
      } else {
        setQuantity(parseQuantity)
      }
    }
  } */
  const addItemToCart = (item: CartItemType) => {
    if (!item.size) {
      return toast.warning('Please select a size')
    }
    if (!item.color) {
      return toast.warning('Please select a color')
    }
    if (!item.amount || item.amount < 1) {
      return toast.warning('Quantity must be greater than or equal to 1')
    }
    dispatch(addItem({ product: item }))
    setSelectedColor('')
    setSelectedSize('')
    setQuantity(1)
    setIsAddToCartDialogOpen(false)
  }
  const cartItem = {
    images: product.images,
    name: product.name,
    price: product.price,
    color: selectedColor,
    size: selectedSize,
    availableVariants: product.variants,
    amount: quantity,
    id: product.id,
    vendor: product.vendor,
    vendorid: product.vendorid,
  }
  return (
    <Dialog
      open={isAddToCartDialogOpen}
      onOpenChange={setIsAddToCartDialogOpen}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto pt-10">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Product to Cart</DialogTitle>
          <DialogDescription className="sr-only">
            Add product to Cart
          </DialogDescription>
        </DialogHeader>
        <Carousel carouselItems={product.images} />
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-base text-muted-foreground">{product.name}</h1>
            <p className="text-base">
              <span className="text-muted-foreground text-sm">Sold by</span>{' '}
              {product.vendor}
            </p>
            <p className="text-primary text-xl font-medium">
              {currencyFormatter(product.price)}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Size</Label>
              <div className="flex flex-wrap gap-2">
                {product?.variants.map(({ size }) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedSize(size)
                      setSelectedColor('')
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {product?.variants.map(({ colors }) => {
                  return colors.map(({ color }) => {
                    const colorCheck = colorsOfSizeSelected?.includes(color)
                    return (
                      <Button
                        key={color}
                        variant={
                          selectedColor === color ? 'default' : 'outline'
                        }
                        size="sm"
                        disabled={!colorCheck}
                        onClick={() => {
                          setSelectedColor(color)
                          setQuantity(1)
                        }}
                      >
                        {color}
                      </Button>
                    )
                  })
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center border rounded-md w-max">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0 rounded-r-none hover:bg-muted"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <div className="h-8 w-12 flex items-center justify-center border-x text-sm font-medium">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity == colorCheck?.quantity}
                  className="h-8 w-8 p-0 rounded-l-none hover:bg-muted"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <Button onClick={() => addItemToCart(cartItem)}>Add to Cart</Button>
      </DialogContent>
    </Dialog>
  )
}
export default AddToCart

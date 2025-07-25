import type { CartItemType } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { Link } from 'react-router-dom'
import { currencyFormatter, slugify } from '@/utils/format'
import { Edit3, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext } from 'react'
import { GlobalContext } from '@/utils/globalContext'
import { useDispatch } from 'react-redux'
import { editItem, removeItem } from '@/features/cart/cartSlice'

function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const {
    setVariantDialogOpen,
    setSelectedItem,
    setEditSize,
    setEditColor,
    setEditQuantity,
  } = useContext(GlobalContext)
  const openVariantDialog = (cartItem: CartItemType) => {
    setSelectedItem(cartItem)
    setEditQuantity(cartItem.amount)
    setEditSize(cartItem.size)
    setEditColor(cartItem.color)
    setVariantDialogOpen(true)
  }
  const dispatch = useDispatch()
  const removeFromCart = () => {
    dispatch(
      removeItem({
        id: cartItem.id,
        size: cartItem.size,
        color: cartItem.color,
        name: cartItem.name,
      })
    )
  }
  const updateCartItem = (quantity: number) => {
    dispatch(
      editItem({
        id: cartItem.id,
        size: cartItem.size,
        color: cartItem.color,
        amount: quantity,
      })
    )
  }
  const sizeCheck = cartItem.availableVariants.find(
    (p) => p.size === cartItem.size
  )
  const colorCheck = sizeCheck?.colors.find((p) => p.color === cartItem.color)
  return (
    <section>
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-200 p-0">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Product Image */}
            <div className="sm:w-48 h-52 sm:h-auto relative bg-gray-50">
              <img
                src={cartItem.images[0]}
                alt={cartItem.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Link
                    to={`/marketplace/${slugify(cartItem.name)}/${cartItem.id}`}
                    className="group"
                  >
                    <h2 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {cartItem.name}
                    </h2>
                  </Link>
                  {/* Clickable Variant Badges */}
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="
                     font-medium text-xs"
                      onClick={() => openVariantDialog(cartItem)}
                    >
                      Size: {cartItem.size}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="
                     font-medium text-xs"
                      onClick={() => openVariantDialog(cartItem)}
                    >
                      Color: {cartItem.color}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openVariantDialog(cartItem)}
                      className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFromCart}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Quantity Controls and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateCartItem(cartItem.amount - 1)}
                      disabled={cartItem.amount <= 1}
                      className="h-8 w-8 p-0 rounded-r-none hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <div className="h-8 w-12 flex items-center justify-center border-x text-sm font-medium">
                      {cartItem.amount}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateCartItem(cartItem.amount + 1)}
                      disabled={cartItem.amount == colorCheck?.quantity}
                      className="h-8 w-8 p-0 rounded-l-none hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Save for Later */}
                  {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSaveForLater(item.id)}
                  className="text-xs"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Save for Later
                </Button> */}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {currencyFormatter(cartItem.price * cartItem.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currencyFormatter(cartItem.price)} each
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
export default CartItem

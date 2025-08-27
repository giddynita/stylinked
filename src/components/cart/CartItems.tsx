import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import type { CartItemType } from '@/utils/types'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { clearCart } from '@/features/cart/cartSlice'
import { toast } from 'sonner'

function CartItems() {
  const { numItemsInCart, cartItems } = useSelector(
    (state: any) => state.cartState
  )
  const dispatch = useDispatch()
  const clearCartItems = () => {
    dispatch(clearCart())
    toast.success('Cart Cleared')
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-foreground/80">
          Cart ({numItemsInCart})
        </h1>
        <Button variant="destructive" size="sm" onClick={clearCartItems}>
          Clear Cart
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="space-y-6">
        {cartItems.map((cartItem: CartItemType, index: number) => {
          return <CartItem key={index} cartItem={cartItem} />
        })}
      </div>
    </>
  )
}
export default CartItems

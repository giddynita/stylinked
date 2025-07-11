import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

function Cart() {
  const { numItemsInCart } = useSelector((state: any) => state.cartState)
  return (
    <div className="relative mr-3">
      <Button size="sm" variant="ghost" asChild>
        <Link to="/cart">
          <ShoppingCart />
        </Link>
      </Button>
      <p className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
        {numItemsInCart}
      </p>
    </div>
  )
}
export default Cart

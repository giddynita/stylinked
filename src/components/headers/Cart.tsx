import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

function Cart() {
  const { numItemsInCart } = useSelector((state: any) => state.cartState)
  const pathname = useLocation().pathname

  return (
    <div className="relative mr-3">
      <Button size="sm" variant="ghost" asChild>
        <NavLink
          className={`${
            pathname === '/cart'
              ? 'text-primary bg-primary/10 rounded-lg'
              : 'text-muted-foreground'
          } `}
          to="/cart"
        >
          <ShoppingCart stroke="currentColor" />
        </NavLink>
      </Button>
      <p className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
        {numItemsInCart}
      </p>
    </div>
  )
}
export default Cart

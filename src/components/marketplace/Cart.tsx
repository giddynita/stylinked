import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

function Cart() {
  const { numItemsInCart } = useSelector((state: any) => state.cartState)
  return (
    <div className="relative">
      <Link to="/cart">
        <ShoppingCart className="text-muted-foreground group-hover:text-accent-foreground h-8 w-8 sm:w-10 sm:h-10" />
      </Link>
      <Button
        size="sm"
        className="absolute -top-7 -right-5 text-sm font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-default"
      >
        {numItemsInCart}
      </Button>
    </div>
  )
}
export default Cart

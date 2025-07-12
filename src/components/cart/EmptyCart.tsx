import { ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <>
      <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-xl font-semibold  mb-2 text-center">
        Your cart is empty
      </h1>
      <p className="text-muted-foreground mb-6 text-center">
        Looks like you haven't added any items to your cart yet.
      </p>
      <div className="text-center">
        <Button asChild>
          <Link to="/marketplace">Start Shopping</Link>
        </Button>
      </div>
    </>
  )
}
export default EmptyCart

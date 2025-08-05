import { CartItems, EmptyCart, OrderSummary } from '@/components/cart'
import AppHeader from '@/components/headers/AppHeader'
import { PageHeading } from '@/components/headings'
import { useSelector } from 'react-redux'

function Cart() {
  const { numItemsInCart } = useSelector((state: any) => state.cartState)

  return (
    <>
      <AppHeader />
      <main
        className={`min-h-screen container space-y-18 my-12 ${
          numItemsInCart && 'lg:grid-cols-3'
        }  lg:grid gap-10`}
      >
        <PageHeading pageDesc="Cart items" pageTitle="Cart" />

        <section className="col-span-2">
          {!numItemsInCart ? <EmptyCart /> : <CartItems />}
        </section>
        {!numItemsInCart || (
          <section>
            <OrderSummary />
          </section>
        )}
      </main>
    </>
  )
}
export default Cart

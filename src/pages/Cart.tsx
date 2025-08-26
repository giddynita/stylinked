import { CartItems, EmptyCart } from '@/components/cart'
import AppHeader from '@/components/headers/AppHeader'
import { PageHeading } from '@/components/headings'
import { sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'
import { useSelector } from 'react-redux'

const OrderSummary = lazy(() => import('@/components/cart/OrderSummary'))

function Cart() {
  const { numItemsInCart } = useSelector((state: any) => state.cartState)

  return (
    <>
      <PageHeading pageDesc="Cart items" pageTitle="Cart" />
      <AppHeader />
      <main
        className={`min-h-screen container space-y-18 my-12 ${
          numItemsInCart && 'lg:grid-cols-3'
        }  lg:grid gap-10`}
      >
        <section className="col-span-2">
          {!numItemsInCart ? <EmptyCart /> : <CartItems />}
        </section>
        <section>
          {!numItemsInCart || sectionSuspense(<OrderSummary />)}
        </section>
      </main>
    </>
  )
}
export default Cart

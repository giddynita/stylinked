import { ProgressIndicator } from '@/components/checkout'
import { useSelector } from 'react-redux'
import SubPagesHeader from '@/components/headers/SubPagesHeader'
import { sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'

const ShippingInformation = lazy(
  () => import('@/components/checkout/ShippingInformation')
)
const OrderReview = lazy(() => import('@/components/checkout/OrderReview'))
const PaymentInformation = lazy(
  () => import('@/components/checkout/PaymentInformation')
)

const Checkout = () => {
  const { step }: { step: number } = useSelector(
    (state: any) => state.checkoutState
  )
  const checkoutComponents: Record<number, React.ComponentType> = {
    1: ShippingInformation,
    2: OrderReview,
    3: PaymentInformation,
  }

  const Component = checkoutComponents[step]

  return (
    <div className="min-h-screen container">
      <SubPagesHeader currentPage="Checkout" previousPage="cart" />

      <div className="pt-2 pb-12 space-y-8">
        <ProgressIndicator />

        <section className="max-w-4xl mx-auto">
          {sectionSuspense(<Component />)}
        </section>
      </div>
    </div>
  )
}

export default Checkout

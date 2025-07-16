import {
  OrderReview,
  PaymentInformation,
  ProgressIndicator,
  ShippingInformation,
} from '@/components/checkout'
import { useSelector } from 'react-redux'
import SubPagesHeader from '@/components/headers/SubPagesHeader'

const Checkout = () => {
  const { step } = useSelector((state: any) => state.checkoutState)

  return (
    <div className="min-h-screen container">
      {/* Header */}
      <SubPagesHeader currentPage="Checkout" previousPage="cart" />

      <div className="pt-2 pb-12 space-y-8">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Main Content */}
        <section className="max-w-4xl mx-auto">
          {/* Step 1: Shipping Information */}
          {step === 1 && <ShippingInformation />}

          {/* Step 2: Order Review */}
          {step === 2 && <OrderReview />}

          {/* Step 3: Order Review */}
          {step === 3 && <PaymentInformation />}
        </section>
      </div>
    </div>
  )
}

export default Checkout

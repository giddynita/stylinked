import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { useUserData } from '@/utils/hooks'
import { useUser } from '@supabase/auth-helpers-react'
import { addOrderItemsAction, addOrdersAction } from '@/utils/action'
import type { Cart, CheckoutType, Order, OrderItem } from '@/utils/types'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { usePaystackPayment } from 'react-paystack'
import { clearCart } from '@/features/cart/cartSlice'
import { resetCheckout } from '@/features/checkout/checkoutSlice'

function PaystackPaymentButton() {
  const { data: userData, isLoading } = useUserData()
  const user = useUser()
  const time = new Date().getTime().toString()
  const reference = `${user?.id}-${time}`
  const { paymentMethod, shippingForm }: CheckoutType = useSelector(
    (state: any) => state.checkoutState
  )
  const { shipping, orderTotal, cartItems }: Cart = useSelector(
    (state: any) => state.cartState
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutate: addOrders, isPending: addingOrders } = addOrdersAction()
  const { mutate: addOrderItems, isPending: addingOrderItems } =
    addOrderItemsAction()
  const clearCartItemsAndCheckoutHistory = () => {
    dispatch(resetCheckout())
    dispatch(clearCart())
  }
  const config = {
    publicKey: `${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
    amount: orderTotal * 100,
    email: user?.email,
    currency: 'NGN',
    firstname: userData?.firstname,
    lastname: userData?.lastname,
    channels: [paymentMethod.id],
    reference: reference,
    metadata: {
      custom_fields: [
        {
          display_name: `${userData?.firstname} ${userData?.lastname}`,
          variable_name: `${userData?.firstname} ${userData?.lastname}`,
          value: 'Order confirmed!',
        },
      ],
    },
  }

  const onSuccess = (reference: string) => {
    const orderData: Order = {
      shipping_method: '',
      shipping_fee: shipping,
      order_total: orderTotal,
      payment_method: paymentMethod.id,
      user_id: user?.id,
      order_id: reference,
      shipping_info: shippingForm,
    }
    const orderItems = cartItems.map((item) => {
      const { images, name, price, color, size, amount, vendor, vendorid } =
        item
      const orderItem: OrderItem = {
        order_id: reference,
        product_id: item.id,
        vendor_id: vendorid,
        images,
        name,
        price,
        color,
        size,
        amount,
        vendor,
      }
      return orderItem
    })
    if (addingOrderItems || addingOrders) {
      toast.loading('Please wait...')
    }
    addOrders(orderData)
    addOrderItems(orderItems)
    clearCartItemsAndCheckoutHistory()
    toast.success('Order placed successfully!')
    return navigate('/account/orders')
  }

  /* const onError = (error:any) => {
    toast.error(error.message)
  } */
  const onClose = () => {
    toast.warning('Payment cancelled')
  }
  const initializePayment = usePaystackPayment(config)

  return (
    <>
      {paymentMethod.name && (
        <Button
          className="w-1/2"
          disabled={isLoading}
          onClick={() => initializePayment({ onSuccess, onClose })}
        >
          Pay via {paymentMethod.name}
        </Button>
      )}
    </>
  )
}
export default PaystackPaymentButton

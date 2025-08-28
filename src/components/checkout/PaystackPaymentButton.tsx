import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { addOrdersAction } from '@/utils/action'
import type {
  Cart,
  CheckoutType,
  Order,
  OrderItem,
  PaystackRef,
  UserDataType,
} from '@/utils/types'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { usePaystackPayment } from 'react-paystack'
import { clearCart } from '@/features/cart/cartSlice'
import { resetCheckout } from '@/features/checkout/checkoutSlice'
import type { User } from '@supabase/supabase-js'

function PaystackPaymentButton() {
  const { user, userData }: { user: User; userData: UserDataType } =
    useSelector((state: any) => state.userState)
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
  const clearCartItemsAndCheckoutHistory = () => {
    dispatch(resetCheckout())
    dispatch(clearCart())
  }
  const config = {
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    amount: orderTotal * 100,
    email: user?.email,
    currency: 'NGN',
    firstname: userData?.firstname,
    lastname: userData?.lastname,
    channels: [paymentMethod.id],
    reference: reference,
    embed: true,
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

  const onSuccess = (reference: PaystackRef) => {
    if (addingOrders) {
      toast.loading('Please wait...')
    }
    const orderData: Omit<Order, 'created_at'> = {
      shipping_method: '',
      shipping_fee: shipping,
      order_total: orderTotal,
      payment_method: paymentMethod.id,
      user_id: user?.id,
      order_id: reference.transaction,
      shipping_info: shippingForm,
      reference: reference.reference,
    }
    const orderItems = cartItems.map((item) => {
      const { images, name, price, color, size, amount, vendor, vendorid } =
        item
      const {
        email,
        phone,
        firstname,
        lastname,
        address,
        city,
        state,
        zipcode,
        country,
      } = shippingForm
      const orderItem: Omit<OrderItem, 'created_at'> = {
        order_id: reference.transaction,
        product_id: item.id,
        vendor_id: vendorid,
        images,
        name,
        price,
        color,
        size,
        amount,
        vendor,
        user_name: `${firstname} ${lastname}`,
        email: email,
        reference: reference.reference,
        shipping_address: `${address}, ${city}, ${state}, ${zipcode}, ${country}`,
        phone,
      }
      return orderItem
    })
    addOrders(
      { orderData, orderItems },
      {
        onSuccess: () => {
          clearCartItemsAndCheckoutHistory()
          toast.success('Order placed successfully!')
          return navigate('/account/orders')
        },
        onError: () => {
          toast.error('Error fetching orders. Contact support for assistance.')
          return navigate('/account/orders')
        },
      }
    )
  }

  const onClose = () => {
    toast.warning('Payment cancelled')
  }
  const initializePayment = usePaystackPayment(config)

  return (
    <>
      {paymentMethod.name && (
        <Button
          className="w-1/2"
          onClick={() => initializePayment({ onSuccess, onClose })}
        >
          Pay via {paymentMethod.name}
        </Button>
      )}
    </>
  )
}
export default PaystackPaymentButton

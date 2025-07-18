import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import checkoutReducer from './features/checkout/checkoutSlice'

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    checkoutState: checkoutReducer,
  },
})

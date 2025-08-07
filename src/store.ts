import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import checkoutReducer from './features/checkout/checkoutSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    checkoutState: checkoutReducer,
    userState: userReducer,
  },
})

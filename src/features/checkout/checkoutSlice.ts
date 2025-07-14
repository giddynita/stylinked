import type { CheckoutType } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: CheckoutType = {
  shippingForm: {
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    country: 'Nigeria',
  },
  step: 1,
  paymentMethod: '',
}
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: defaultState,
  reducers: {
    handleShippingFormInput: (state, action) => {
      const { key, value } = action.payload
      state.shippingForm = { ...state.shippingForm, [key]: value }
    },
    handleStepChange: (state, action) => {
      const { step } = action.payload
      state.step = step
    },
    handlePaymentMethod: (state, action) => {
      const { method } = action.payload
      state.paymentMethod = method
    },
  },
})

export const {
  handleShippingFormInput,
  handleStepChange,
  handlePaymentMethod,
} = checkoutSlice.actions

export default checkoutSlice.reducer

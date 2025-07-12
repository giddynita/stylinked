import type { Cart, CartItemType } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

const defaultState: Cart = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 1200,
  orderTotal: 0,
  tax: 0,
}

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : defaultState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload
      const item = state.cartItems.find(
        (i: CartItemType) =>
          i.id === product.id &&
          i.color === product.color &&
          i.size === product.size
      )
      if (item) {
        state.numItemsInCart += product.amount - item.amount
        state.cartTotal +=
          product.price * product.amount - product.price * item.amount
        item.amount = product.amount
      } else {
        state.cartItems.push(product)
        state.numItemsInCart += product.amount
        state.cartTotal += product.price * product.amount
      }
      cartSlice.caseReducers.calculateTotals(state)
      toast.success(
        `${product.amount > 1 ? `${product.amount}X` : ''} ${
          product.name
        } in color ${product.color} and size ${product.size} added to your cart`
      )
    },
    clearCart: (state) => {
      state.cartItems = []
      state.numItemsInCart = 0
      state.cartTotal = 0
      state.shipping = 1200
      state.orderTotal = 0
      localStorage.setItem('cart', JSON.stringify(defaultState))
      toast.success('Cart Cleared')
    },
    removeItem: (state, action) => {
      const { id, size, color, name } = action.payload
      const product = state.cartItems.find(
        (i: CartItemType) => i.id === id && i.size === size && i.color === color
      )
      state.cartItems = state.cartItems.filter(
        (i: CartItemType) => !(i.id == id && i.size == size && i.color == color)
      )
      state.numItemsInCart -= product.amount
      state.cartTotal -= product.price * product.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success(
        `${name} in color ${color} and size ${size} removed from your cart`
      )
    },
    editItem: (state, action) => {
      const { id, size, color, amount } = action.payload
      const item = state.cartItems.find(
        (i: CartItemType) => i.id === id && i.size === size && i.color === color
      )
      state.numItemsInCart += amount - item.amount
      state.cartTotal += item.price * (amount - item.amount)
      item.amount = amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('Cart updated')
    },
    calculateTotals: (state) => {
      state.tax = 0.02 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions

export default cartSlice.reducer

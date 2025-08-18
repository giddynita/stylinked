import type { AppUser } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: AppUser = {
  userData: null,
  userRole: null,
  user: null,
}

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : defaultState
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload
      state.user = user
      localStorage.setItem('user', JSON.stringify(state))
    },
    setUserData: (state, action) => {
      const { userData, userRole } = action.payload
      state.userData = userData
      state.userRole = userRole
      localStorage.setItem('user', JSON.stringify(state))
    },

    clearUser: (state) => {
      state.userData = null
      state.userRole = null
      state.user = null
      localStorage.setItem('user', JSON.stringify(defaultState))
    },
  },
})

export const { setUser, setUserData, clearUser } = userSlice.actions

export default userSlice.reducer

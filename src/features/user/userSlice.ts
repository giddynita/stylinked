import type { AppUser } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: AppUser = {
  userData: null,
  userRole: null,
  user: null,
}

const getUserFromLocalStorage: () => AppUser = () => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : defaultState
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage(),
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setUserData: (state, action) => {
      const { userData } = action.payload
      state.userData = userData
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    setUserRole: (state, action) => {
      const { userRole } = action.payload
      state.userRole = userRole
      sessionStorage.setItem('user', JSON.stringify(state))
    },

    clearUser: (state) => {
      state.userData = null
      state.userRole = null
      state.user = null
      sessionStorage.setItem('user', JSON.stringify(defaultState))
    },
  },
})

export const { setUser, setUserData, setUserRole, clearUser } =
  userSlice.actions

export default userSlice.reducer

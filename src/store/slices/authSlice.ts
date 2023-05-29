import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from '@/models/user'

interface AuthState {
    user? : User
}

const initialState: AuthState = {
    user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { updateUser } = authSlice.actions

export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from '@/models/user'

const initialState: User[] = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser : (state, action: PayloadAction<User>) => {
      state.push(action.payload)
    },
  },
})

export const { addUser } = usersSlice.actions

export default usersSlice.reducer
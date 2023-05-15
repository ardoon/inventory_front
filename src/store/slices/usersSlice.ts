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
    updateUser : (state, action: PayloadAction<Partial<User>>) => {
      const user = action.payload
      return state.map((item: User) => {
        return item.id === user.id ? {... item, ...user} : item;
      })
    },
    deleteUser : (state, action: PayloadAction<string>) => {
      return state.filter((user: User) => user.id !== action.payload)
    }
  },
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer
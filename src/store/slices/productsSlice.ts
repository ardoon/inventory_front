import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Product from '@/models/product'

const initialState: Product[] = []

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct : (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    },
    // updateUnit : (state, action: PayloadAction<{unit: Partial<Unit>, key: string}>) => {
    //   const { unit, key } = action.payload
    //   return state.map((item: Unit) => {
    //     return item.name === key ? {... item, ...unit} : item;
    //   })
    // },
    // deleteUnit : (state, action: PayloadAction<string>) => {
    //   return state.filter((unit: Unit) => unit.name !== action.payload)
    // }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = productsSlice.actions

export default productsSlice.reducer
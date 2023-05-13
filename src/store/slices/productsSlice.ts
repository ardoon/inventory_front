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
    updateProduct : (state, action: PayloadAction<Partial<Product>>) => {
      const product = action.payload
      return state.map((item: Product) => {
        return item.id === product.id ? {... item, ...product} : item;
      })
    },
    deleteProduct : (state, action: PayloadAction<string>) => {
      return state.filter((product: Product) => product.id !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions

export default productsSlice.reducer
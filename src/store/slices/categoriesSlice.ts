import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Category from '@/models/category'

const initialState: Category[] = []

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload)
    },
    updateCategory: (state, action: PayloadAction<{ category: Partial<Category>, key: string }>) => {
      const { category, key } = action.payload
      return state.map((item: Category) => {
        return item.name === key ? { ...item, ...category } : item;
      })
    },
    editCategory: (state, action: PayloadAction<Partial<Category>>) => {
      return state.map((item: Category) => {
        return item.id === action.payload.id ? { ...item, ...action.payload } : item;
      })
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter((category: Category) => category.id !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCategory, updateCategory, editCategory, deleteCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
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
    addSubCategory: (state, action: PayloadAction<{ category: Category, key: string }>) => {

      const { category, key } = action.payload

      return state.map((item: Category) => {

        const newItem = {
          ...item
        }

        if (newItem.children === undefined) {
          newItem.children = [category]
        } else {
          const newChildren = item.children?.concat([category])
          newItem.children = newChildren
        }

        return item.id === key ? newItem : item
          
      })
    },
    updateCategory: (state, action: PayloadAction<{ category: Partial<Category>, key: string }>) => {
      const { category, key } = action.payload
      return state.map((item: Category) => {
        return item.name === key ? { ...item, ...category } : item;
      })
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter((category: Category) => category.name !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCategory, addSubCategory, updateCategory, deleteCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
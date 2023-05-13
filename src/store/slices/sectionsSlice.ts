import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Section from '@/models/section'

const initialState: Section[] = []

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection : (state, action: PayloadAction<Section>) => {
      console.log(state);
            
       state.push(action.payload)
    },
    updateSection : (state, action: PayloadAction<Partial<Section>>) => {
      const section = action.payload
      return state.map((item: Section) => {
        return item.id === section.id ? {... item, ...section} : item;
      })
    },
    deleteSection : (state, action: PayloadAction<string>) => {
      return state.filter((product: Section) => product.id !== action.payload)
    }
  },
})

export const { addSection, updateSection, deleteSection } = sectionsSlice.actions

export default sectionsSlice.reducer
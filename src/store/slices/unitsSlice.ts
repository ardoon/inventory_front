import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Unit from '@/models/unit'

const initialState: Unit[] = []

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Unit[]>) => {
      state = action.payload;
    },
    addUnit : (state, action: PayloadAction<Unit>) => {
      state.push(action.payload)
    },
    updateUnit : (state, action: PayloadAction<{unit: Partial<Unit>, key: string}>) => {
      const { unit, key } = action.payload
      return state.map((item: Unit) => {
        return item.name === key ? {... item, ...unit} : item;
      })
    },
    deleteUnit : (state, action: PayloadAction<string>) => {
      return state.filter((unit: Unit) => unit.name !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUnits, addUnit, updateUnit, deleteUnit } = unitsSlice.actions

export default unitsSlice.reducer
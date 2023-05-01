import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Unit from '@/models/unit'

const initialState: Unit[] = []

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    addUnit : (state, action: PayloadAction<Unit>) => {
        state.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUnit } = unitsSlice.actions

export default unitsSlice.reducer
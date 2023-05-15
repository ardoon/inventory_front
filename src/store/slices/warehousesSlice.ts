import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Warehouse from '@/models/warehouse'

const initialState: Warehouse[] = []

export const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    addWarehouse : (state, action: PayloadAction<Warehouse>) => {
      state.push(action.payload)
    },
    updateWarehouse : (state, action: PayloadAction<{warehouse: Partial<Warehouse>, key: string}>) => {
      const { warehouse, key } = action.payload
      return state.map((item: Warehouse) => {
        return item.name === key ? {... item, ...warehouse} : item;
      })
    },
    deleteWarehouse : (state, action: PayloadAction<string>) => {
      return state.filter((unit: Warehouse) => unit.name !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWarehouse, updateWarehouse, deleteWarehouse } = warehousesSlice.actions

export default warehousesSlice.reducer
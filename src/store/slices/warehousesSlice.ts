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
    updateWarehouse : (state, action: PayloadAction<Partial<Warehouse>>) => {
      const warehouse = action.payload
      return state.map((item: Warehouse) => {
        return item.id === warehouse.id ? {... item, ...warehouse} : item;
      })
    },
    deleteWarehouse : (state, action: PayloadAction<string>) => {
      return state.filter((warehouse: Warehouse) => warehouse.id !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWarehouse, updateWarehouse, deleteWarehouse } = warehousesSlice.actions

export default warehousesSlice.reducer
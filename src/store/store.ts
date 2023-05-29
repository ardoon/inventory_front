import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/productsSlice'
import unitReducer from './slices/unitsSlice'
import categoriesReducer from './slices/categoriesSlice'
import sectionsReducer from './slices/sectionsSlice'
import warehousesReducer from './slices/warehousesSlice'
import usersReducer from './slices/usersSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    units: unitReducer,
    categories: categoriesReducer,
    sections: sectionsReducer,
    warehouses: warehousesReducer,
    users: usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
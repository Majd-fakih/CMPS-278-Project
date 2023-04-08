import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './features/moviesSlice'

export const store = configureStore({
  reducer: {
    Movies: moviesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore, createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      if (state.includes(id)) {
        return state.filter((v) => v !== id)
      }
      state.push(id)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
})

export default store

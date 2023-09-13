import { createSlice } from '@reduxjs/toolkit';

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: [],
  reducers: {
    setRecipes: (state, action) => action.payload,
  },
});

export const { setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;

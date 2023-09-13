import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    selectedRecipe: null, // New state for selected recipe
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setSelectedRecipe: (state, action) => {
      // New reducer
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state) => {
      // New reducer
      state.selectedRecipe = null;
    },
  },
});

export const { setRecipes, setSelectedRecipe, clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;

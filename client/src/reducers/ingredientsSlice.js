import { createSlice } from '@reduxjs/toolkit';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: [],
  reducers: {
    showIngredient: (state, action) => {
      state.push(action.payload);
    },
    clearIngredients: () => [],
  },
});

export const { showIngredient, clearIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

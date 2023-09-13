import { createSlice } from '@reduxjs/toolkit';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: [],
  reducers: {
    addIngredient: (state, action) => {
      state.push(action.payload);
    },
    clearIngredients: () => [],
  },
});

export const { addIngredient, clearIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

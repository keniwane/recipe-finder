import { createSlice } from '@reduxjs/toolkit';

export const ingredientListSlice = createSlice({
  name: 'ingredientList',
  initialState: [],
  reducers: {
    addToList: (state, action) => {
      state.push(action.payload);
    },
    removeFromList: (state, action) => {
      return state.filter((ingredient) => ingredient.id !== action.payload.id);
    },
    clearList: () => [],
  },
});

export const { addToList, removeFromList, clearList } =
  ingredientListSlice.actions;
export default ingredientListSlice.reducer;

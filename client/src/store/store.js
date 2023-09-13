import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import recipesReducer from '../reducers/recipeSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import ingredientListReducer from '../reducers/ingredientListSlice';
import recipesReducer from '../reducers/recipeSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientList: ingredientListReducer,
    recipes: recipesReducer,
  },
});

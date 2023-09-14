import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRecipes } from '../reducers/recipeSlice';
import { removeFromList, clearList } from '../reducers/ingredientListSlice';

function IngredientList() {
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.ingredientList);

  const handleRemoveFromList = (ingredient) => {
    dispatch(removeFromList(ingredient));
  };

  const handleFindRecipes = async () => {
    const ingredientIds = ingredientList.map((ing) => ing.id).join(',');
    const ingredientNames = ingredientList.map((ing) => ing.name).join(',');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/find-recipes-by-ingredients?ingredientIds=${ingredientIds}&ingredientNames=${ingredientNames}`
      );

      // Dispatch an action to store the found recipes in Redux
      dispatch(setRecipes(response.data));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='ingredient-list'>
      <h2 className='header'>Ingredients List</h2>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li
            className='selected-ingredients'
            key={index}
            onClick={() => handleRemoveFromList(ingredient)}
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
      <button onClick={handleFindRecipes} className='recipe-search-button'>
        Find Recipes
      </button>
    </div>
  );
}

export default IngredientList;

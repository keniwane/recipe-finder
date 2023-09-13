import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRecipes } from '../reducers/recipeSlice';

function IngredientList() {
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.ingredientList);

  const handleFindRecipes = async () => {
    const ingredientIds = ingredientList.map((ing) => ing.id).join(',');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/find-recipes-by-ingredients?ingredients=${ingredientIds}`
      );

      // Dispatch an action to store the found recipes in Redux
      dispatch(setRecipes(response.data));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='ingredient-list'>
      <h2>Ingredients List</h2>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
      <button onClick={handleFindRecipes}>Find Recipes</button>
    </div>
  );
}

export default IngredientList;

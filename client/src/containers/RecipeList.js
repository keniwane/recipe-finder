import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRecipe } from '../reducers/recipeSlice';
import RecipeDetails from '../components/RecipeDetails';
import axios from 'axios';

function RecipeList() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);

  const handleRecipeClick = async (recipe) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/recipe-details/${recipe.id}`);
      console.log('Updated selectedRecipe:', response.data);

      // Dispatch the new selected recipe to completely replace the existing one
      dispatch(setSelectedRecipe(response.data));
      setShowRecipeDetails(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  console.log('showRecipeDetails:', showRecipeDetails);
  console.log('selectedRecipe:', selectedRecipe);
  console.log('selectedRecipe.steps:', selectedRecipe && selectedRecipe[0].steps);

  return (
    <div>
      <h2 className='header'>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleRecipeClick(recipe)} className='recipe-item'>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Missing Ingredients:</p>
            <ul>
              {recipe.missedIngredients && recipe.missedIngredients.length > 0 ? (
                recipe.missedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))
              ) : (
                <li>None</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      {showRecipeDetails && selectedRecipe && <RecipeDetails recipe={selectedRecipe[0]} />}
      {/* Pass the selected recipe as a prop */}
    </div>
  );
}

export default RecipeList;

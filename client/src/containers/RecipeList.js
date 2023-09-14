import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeDetails from '../components/RecipeDetails';
import axios from 'axios';

function RecipeList() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  const [localSelectedRecipes, setLocalSelectedRecipes] = useState({});
  const [flippedRecipeId, setFlippedRecipeId] = useState(null);

  const handleRecipeClick = async (recipe) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/recipe-details/${recipe.id}`);
      console.log('Updated selectedRecipe:', response.data);

      setLocalSelectedRecipes((prev) => ({
        ...prev,
        [recipe.id]: response.data,
      }));

      if (flippedRecipeId === recipe.id) {
        setFlippedRecipeId(null);
      } else {
        setFlippedRecipeId(recipe.id);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div>
      <h2 className='header'>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className='recipe-item'>
            <div
              className={flippedRecipeId === recipe.id ? 'flip-card flipped' : 'flip-card'}
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className='flip-card-inner'>
                <div className='flip-card-front'>
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
                </div>
                <div className='flip-card-back'>
                  {localSelectedRecipes[recipe.id] ? (
                    <RecipeDetails recipe={localSelectedRecipes[recipe.id][0]} />
                  ) : (
                    <p>Click for More Details!</p>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;

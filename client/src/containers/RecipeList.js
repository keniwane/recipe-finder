import React from 'react';
import { useSelector } from 'react-redux';

function RecipeList() {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Likes: {recipe.likes}</p>
            <h4>Missed Ingredients:</h4>
            <ul>
              {recipe.missedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
            {/* Similar lists for unusedIngredients and usedIngredients */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;

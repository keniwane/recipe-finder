import React from 'react';

function RecipeDetails({ recipe }) {
  return (
    <div className='recipe-detail-box'>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <h4>Missing Ingredients:</h4>
      <ul>
        {recipe.missedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;

import React from 'react';

function RecipeDetails({ recipe }) {
  console.log('Rendering RecipeDetail with recipe:', recipe);

  return (
    <div className='recipe-detail'>
      <h4>Steps:</h4>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;

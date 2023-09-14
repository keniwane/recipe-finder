import React from 'react';

function RecipeDetails({ recipe }) {
  console.log('Rendering RecipeDetail with recipe:', recipe);

  return (
    <div className='recipe-detail'>
      <h4>Steps:</h4>
      <ol>
        {recipe.steps &&
          recipe.steps.map((step, index) => (
            <li key={index}>
              <strong>Step {step.number}:</strong> {step.step}
            </li>
          ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;

// RecipeList.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRecipe } from '../reducers/recipeSlice';
import RecipeDetail from '../components/RecipeDetails';
import axios from 'axios';

function RecipeList() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false); // State to control recipe details visibility

  const handleRecipeClick = async (recipe) => {
    dispatch(setSelectedRecipe(recipe));

    // Fetch the full recipe details from your server, which will in turn make a Spoonacular API call
    try {
      const response = await axios.get(`http://localhost:8000/api/recipe-details/${recipe.id}`);

      // Update the selectedRecipe with the full details
      dispatch(setSelectedRecipe({ ...recipe, details: response.data }));
      setShowRecipeDetails(true); // Show the recipe details
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };
  console.log(selectedRecipe);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Likes: {recipe.likes}</p>
          </li>
        ))}
      </ul>
      {showRecipeDetails && selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
    </div>
  );
}

// function RecipeList() {
//   const recipes = useSelector((state) => state.recipes);

//   return (
//     <div>
//       <h2>Recipes</h2>
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>
//             <h3>{recipe.title}</h3>
//             <img src={recipe.image} alt={recipe.title} />
//             <p>Likes: {recipe.likes}</p>
//             <h4>Missing Ingredients:</h4>
//             <ul>
//               {recipe.missedIngredients.length > 0 ? (
//                 recipe.missedIngredients.map((ingredient) => (
//                   <li key={ingredient.id}>{ingredient.name}</li>
//                 ))
//               ) : (
//                 <li>None</li>
//               )}
//             </ul>
//             {/* Similar lists for unusedIngredients and usedIngredients */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default RecipeList;

import React from 'react';
import IngredientSearch from './containers/IngredientSearch';
import RecipeList from './containers/RecipeList';

function App() {
  return (
    <div className='app'>
      <h1>Recipe Finder</h1>
      <IngredientSearch />
      <RecipeList />
    </div>
  );
}

export default App;

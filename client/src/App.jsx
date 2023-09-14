import React from 'react';
import IngredientSearch from './containers/IngredientSearch';
import IngredientList from './containers/IngredientList';
import RecipeList from './containers/RecipeList';
import '../styles.css';

function App() {
  return (
    <div className='app'>
      <h1 className='header'>Recipe Finder</h1>
      <IngredientSearch />
      <IngredientList />
      <RecipeList />
    </div>
  );
}

export default App;

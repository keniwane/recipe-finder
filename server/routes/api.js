const express = require('express');
const apiRouter = express.Router();

const {
  searchIngredients,
  searchRecipes,
} = require('../controllers/recipeController');

// Route to search for ingredients
apiRouter.get('/search-ingredients', searchIngredients);

// Route to search for recipes based on ingredients
apiRouter.get('/search-recipes', searchRecipes);

module.exports = apiRouter;

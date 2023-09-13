const express = require('express');
const apiRouter = express.Router();

const {
  searchIngredients,
  findRecipesByIngredients,
  getRecipeDetails,
} = require('../controllers/recipeController');

// Route to search for ingredients
apiRouter.get('/search-ingredients', searchIngredients);

apiRouter.get('/find-recipes-by-ingredients', findRecipesByIngredients);

apiRouter.get('/recipe-details/:id', getRecipeDetails);

module.exports = apiRouter;

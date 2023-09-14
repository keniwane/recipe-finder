const axios = require('axios');
require('dotenv').config();

const { IngredientSearch, Recipe, RecipeDetail } = require('../models/recipeModels');

exports.searchIngredients = async (req, res, next) => {
  try {
    const ingredient = req.query.ingredient;
    console.log(ingredient);

    // First, check if the ingredient is already in the database
    const existingIngredients = await IngredientSearch.findOne({
      query: ingredient,
    });

    if (existingIngredients) {
      console.log('Retrieved from Database:', existingIngredients.results.length);
      return res.json(existingIngredients);
    }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${process.env.API_KEY}`
    );

    // Store the result in the database
    const newSearch = new IngredientSearch({
      query: ingredient, // Storing the search term
      ...response.data, // Spreading the rest of the data
    });
    await newSearch.save();

    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.findRecipesByIngredients = async (req, res, next) => {
  try {
    const Id = req.query.ingredientIds;
    const ingredientNames = req.query.ingredientNames;
    // First, check if recipes for these ingredients are already in the database
    const ingredientIds = Id.split(',').map((id) => parseInt(id));
    const existingRecipes = await Recipe.find({
      'usedIngredients.id': { $in: ingredientIds },
    });

    if (existingRecipes.length > 0) {
      return res.json(existingRecipes);
    }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientNames}&apiKey=${process.env.API_KEY}`
    );
    console.log('Number of recipes from API:', response.data.length);

    // Store the result in the database
    const newRecipes = response.data.map((recipeData) => new Recipe(recipeData));
    const insertedRecipes = await Recipe.insertMany(newRecipes);
    // console.log('Inserted recipes:', insertedRecipes);

    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    next(error);
  }
};

exports.getRecipeDetails = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    console.log(recipeId);

    // Check if recipe details are already in the database
    const existingRecipe = await RecipeDetail.findOne({ recipeId: recipeId });
    console.log('existing recipe : ', existingRecipe);
    if (existingRecipe) {
      return res.json(existingRecipe);
    }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?stepBreakdown=true&apiKey=${process.env.API_KEY}`
    );
    console.log('Retrieved recipe details: ', response.data);

    const recipeData = response.data[0];

    // Store the result in the database
    const newRecipeDetail = new RecipeDetail({
      recipeId: recipeId,
      name: recipeData.name,
      steps: recipeData.steps,
    });
    await newRecipeDetail.save();
    console.log('Stored new details in database: ', newRecipeDetail);

    res.json(response.data);
  } catch (error) {
    console.error('Error while processing:', error.message);
    next(error);
  }
};

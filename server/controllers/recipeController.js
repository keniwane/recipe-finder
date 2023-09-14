const axios = require('axios');
require('dotenv').config();

const { Recipe, MissedIngredient, RecipeDetail } = require('../models/recipeModels');

exports.searchIngredients = async (req, res, next) => {
  try {
    const ingredient = req.query.ingredient;

    // First, check if the ingredient is already in the database
    const existingIngredient = await MissedIngredient.findOne({
      name: ingredient,
    });

    if (existingIngredient) {
      return res.json(existingIngredient);
    }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${process.env.API_KEY}`
    );

    // Store the result in the database
    const newIngredient = new MissedIngredient(response.data);
    await newIngredient.save();

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
    // const existingRecipe = await RecipeDetail.findOne({ id: recipeId });
    // console.log('existing recipe : ', existingRecipe);
    // if (existingRecipe) {
    //   return res.json(existingRecipe);
    // }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?stepBreakdown=true&apiKey=${process.env.API_KEY}`
    );
    console.log('Retrieved recipe details: ', response.data);

    // Store the result in the database
    // const newRecipeDetail = new RecipeDetail(response.data);
    // await RecipeDetail.save();
    // console.log('new details: ', newRecipeDetail);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

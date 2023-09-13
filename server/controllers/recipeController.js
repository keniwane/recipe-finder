const axios = require('axios');

const API_KEY = 'e559bd8ab2da4600bc8f3f11a212805d';

const {
  Recipe,
  MissedIngredient,
  UsedIngredient,
} = require('../models/recipeModels');

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
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${API_KEY}`
    );

    // Store the result in the database
    const newIngredient = new MissedIngredient(response.data);
    await newIngredient.save();

    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.searchRecipes = async (req, res, next) => {
  try {
    const ingredients = req.query.ingredients; // Assuming ingredients are passed as a comma-separated string

    // First, check if recipes for these ingredients are already in the database
    const existingRecipes = await Recipe.find({
      'usedIngredients.name': { $in: ingredients.split(',') },
    });

    if (existingRecipes.length > 0) {
      return res.json(existingRecipes);
    }

    // If not in the database, fetch from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
    );

    // Store the result in the database
    const newRecipes = response.data.map(
      (recipeData) => new Recipe(recipeData)
    );
    await Recipe.insertMany(newRecipes);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientResultSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const IngredientSearchSchema = new Schema({
  query: {
    type: String,
    required: true,
    description: 'The ingredient name searched by the user.',
  },
  results: [IngredientResultSchema],
  totalResults: {
    type: Number,
    required: true,
  },
});

const IngredientSearch = mongoose.model('IngredientSearch', IngredientSearchSchema);

const missedIngredientSchema = new mongoose.Schema({
  aisle: String,
  amount: Number,
  id: Number,
  image: String,
  meta: [String],
  name: String,
  original: String,
  originalName: String,
  unit: String,
  unitLong: String,
  unitShort: String,
});

const usedIngredientSchema = new mongoose.Schema({
  aisle: String,
  amount: Number,
  id: Number,
  image: String,
  meta: [String],
  name: String,
  original: String,
  originalName: String,
  unit: String,
  unitLong: String,
  unitShort: String,
});

const unusedIngredientSchema = new mongoose.Schema({
  aisle: String,
  amount: Number,
  id: Number,
  image: String,
  meta: [String],
  name: String,
  original: String,
  originalName: String,
  unit: String,
  unitLong: String,
  unitShort: String,
});

// Schema for equipment
const EquipmentSchema = new Schema({
  id: Number,
  name: String,
  localizedName: String,
  image: String,
});

// Schema for ingredients
const IngredientSchema = new Schema({
  id: Number,
  name: String,
  localizedName: String,
  image: String,
});

// Schema for individual steps
const StepSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    required: true,
  },
  equipment: [EquipmentSchema],
  ingredients: [IngredientSchema],
  length: {
    number: Number,
    unit: String,
  },
});

// Main schema for the recipe details
const RecipeDetailSchema = new Schema({
  recipeId: {
    // to uniquely identify the recipe
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  steps: [StepSchema],
});

const RecipeDetail = mongoose.model('RecipeDetail', RecipeDetailSchema);

const recipeSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  imageType: String,
  likes: Number,
  missedIngredientsCount: Number,
  missedIngredients: [missedIngredientSchema],
  title: String,
  unusedIngredients: [unusedIngredientSchema],
  usedIngredientCount: Number,
  usedIngredients: [usedIngredientSchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = {
  Recipe,
  RecipeDetail,
  IngredientSearch,
};

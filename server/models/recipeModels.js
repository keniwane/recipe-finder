const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const MissedIngredient = mongoose.model('MissedIngredient', missedIngredientSchema);

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

const UsedIngredient = mongoose.model('usedIngredient', usedIngredientSchema);

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

const UnusedIngredient = mongoose.model('unusedIngredient', unusedIngredientSchema);

const stepEquipmentSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
  temperature: {
    number: Number,
    unit: String,
  },
});

const stepIngredientSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
});

const stepSchema = new mongoose.Schema({
  equipment: [stepEquipmentSchema],
  ingredients: [stepIngredientSchema],
  number: Number,
  step: String,
  length: {
    number: Number,
    unit: String,
  },
});

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
  steps: [stepSchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = {
  Recipe,
  MissedIngredient,
  UsedIngredient,
  UnusedIngredient,
};

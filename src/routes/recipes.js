const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipes');
const UserModel = require('../models/Users');
const router = express.Router();
const verifyToken = require('./users');

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const recipe = new RecipeModel.findById(req.body.recipeID);
    const user = new UserModel.findById(req.body.userID);
    user.saveRecipe.push(recipe);
    await user.save();
    res.json({saveRecipe: user.saveRecipe});
  } catch (error) {
    res.json(error);
  }
});

router.get('/saveRecipe/id/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);

    res.json({saveRecipe: user?.saveRecipe});
  } catch (error) {
    res.json(error);
  }
});
router.get('/saveRecipe/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const saveRecipe = await RecipeModel.find({_id: {$in: user.saveRecipe}});
    res.json(saveRecipe);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

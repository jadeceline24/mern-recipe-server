const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes');

const app = express();

//whenever you accept data apply middleware to accept JSON
app.use(cors());
app.use(express.json()); //middleware convert to JSON

mongoose.connect(
  'mongodb+srv://tempuser:tempuser123@blognode.9lpwggp.mongodb.net/recipe?retryWrites=true&w=majority',
);

app.use('/auth', userRouter);
app.use('/recipes', recipeRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log('Localhost 3001 running');
});

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const {username, password} = req.body;
  const user = await UserModel.findOne({username});
  if (user) {
    return res.json({message: 'user already registered'});
  }
  const hashpass = await bcrypt.hash(password, 10);
  const newUser = new UserModel({username, password: hashpass});
  await newUser.save();
  res.json({message: 'User Registered'});
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await UserModel.findOne({username});
  if (!user) {
    return res.json({message: 'user doesnt exist'});
  }
  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    res.json({message: 'Wrong username and password'});
  }
  const token = jwt.sign({id: user._id}, 'secret');
  res.json({token, userID: user._id});
});


module.exports = router;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if(token) {
    jwt.verify(token, 'secret', (err) => {
      if(err) return res.sendStatus(403)
      next()
    })
  } else{
    res.sendStatus(401)
  }
}
module.exports = verifyToken
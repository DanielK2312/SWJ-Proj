const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');

const tokenList = {};

const router = express.Router();

const genToken = (email) => {
  const token = jwt.sign({ data: email }, config.jwt.secret, { expiresIn: '30m' });
  const refreshToken = jwt.sign({ data: email }, config.jwt.refreshSecret, { expiresIn: '8h' });
  const response = {
    status: 'Logged in',
    token,
    refreshToken,
  };
  tokenList[refreshToken] = response;
  return response;
};

router.post('/register', async function (req, res, next) {
  const { email, password } = req.body;

  // Check If User Exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use' });
  }

  const newUser = new User({ email, password });
  await newUser.save();

  const user = {
    email: req.body.email,
  };

  const response = genToken(email);
  res.status(200).json(response);
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  // Check If User Exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    const successful = foundUser.isValidPassword(password);
    if (successful) {
      const response = genToken(email);
      res.status(200).json(response);
    } else {
      return res.status(403).json({ error: 'Authentication failed' });
    }
  } else {
    return res.status(403).json({ error: 'User not found' });
  }
});

router.post('/token', (req, res) => {
  const postData = req.body;
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const token = jwt.sign({ data: postData.email }, config.jwt.secret, { expiresIn: '30m' });
    const response = {
      token,
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request');
  }
});

module.exports = router;

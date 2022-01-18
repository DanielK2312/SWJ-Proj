const express = require('express');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');

// Store list of current refresh and access tokens
// Format: tokenList[refresh_token] = { status, token, refresh_token }
const tokenList = {};

const router = express.Router();

// Generates an access token and refresh token.
// Access token life: 30 minutes
// Refresh token life: 3 days
const genToken = (email) => {
  const token = jwt.sign({ data: email }, config.jwt.secret, { expiresIn: '2h' });
  const response = {
    status: 'Logged in',
    token,
  };
  tokenList[email] = response;
  return response;
};


/**
 * API Route for sign up.
 * @name /api/auth/register
 * @param req.body { email, password }
 */
router.post('/register', async function (req, res, next) {
  const { email, password } = req.body;

  // Check If User Exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use.' });
  }

  // Create new user in database
  const newUser = new User({ email, password });
  await newUser.save();

  // Generate authentication tokens
  const response = genToken(email);
  res.status(200).json(response);
});

/**
 * API Route for login.
 * @name /api/auth/login
 * @param req.body { email, password }
 */
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  // Check If User Exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    // Check for valid password
    const successful = foundUser.isValidPassword(password);
    if (successful) {
      // Generate authentication tokens
      const response = genToken(email);

      const dataToSecure = {
        email: email,
      };
  
      res.cookie("swj-refresh", JSON.stringify(dataToSecure), {
        secure: true,
        path: '/api/auth/token',
        httpOnly: true,
        sameSite: 'strict',
        expires: dayjs().add(30, "days").toDate(),
      });

      res.status(200).json(response);
    } else {
      return res.status(403).json({ error: 'Authentication failed' });
    }
  } else {
    return res.status(403).json({ error: 'User not found' });
  }
});

/**
 * API Route for token refresh.
 * @name /api/auth/token
 * @param req.body { refresh_token, email }
 * @todo Generate a new refresh token each time this is called.
 */
router.post('/token', (req, res) => {
  const postData = req.body;
  // Check if refresh token exists and is in known tokenList
  if (postData.refreshToken && postData.email in tokenList) {
    const token = jwt.sign({ data: postData.email }, config.jwt.secret, { expiresIn: '2h' });
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

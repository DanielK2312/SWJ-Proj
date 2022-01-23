const express = require('express');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');

// Store list of current refresh and access tokens
// Format: tokenList[email] = { status, access_token }
const tokenList = {};

const router = express.Router();

// Generates an access token and refresh token.
// Access token life: 30 minutes
// Refresh token life: 3 days
const genToken = (nonce) => {
  const token = jwt.sign({ data: nonce }, config.jwt.secret, { expiresIn: '2h' });
  const response = {
    status: 'Logged in',
    token,
  };
  tokenList[nonce] = response;
  return response;
};

// Very sad function here.
// Someone has attempted to use an invalid and expired token,
// now we have to go invalidate all children token in order to keep account secure.
const killChildren = (parent) => {
  // Hopefully this will never be called

  
}

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
      const nonce = uuidv4();

      // Generate authentication tokens
      const response = genToken(nonce);

      res.cookie("refreshToken", nonce, {
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
  if (req.cookies.refreshToken && req.cookies.refreshToken in tokenList) {
    if (tokenList[req.cookies.refreshToken].status == 'Invalid') {
      // Rage quietly inside... why would anyone ever use an invalid token :(

      // Kill children peacefully... 
      killChildren(req.cookies.refreshToken);

      res.status(404).send('Go away. All children tokens are now invalidated.');
    } else {
      const nonce = uuidv4();

      /** Invalidate current refresh token
      *   
      *   If someone attempts to use the invalid token,
      *   all child tokens connected to it will be also invalidated.
      */
      const invalidate_msg = {
        status: 'Invalid',
        token: null,
        child: nonce
      };
      tokenList[req.cookies.refreshToken] = invalidate_msg;

      // Generate new refresh and access token

      const response = genToken(nonce);

      res.cookie("refreshToken", nonce, {
        secure: true,
        path: '/api/auth/token',
        httpOnly: true,
        sameSite: 'strict',
        expires: dayjs().add(30, "days").toDate(),
      });
      res.status(200).json(response);
    }

  } else {
    res.status(404).send('Invalid request');
  }
});

/**
 * API Route for token validity checker.
 * @name /api/auth/check
 */
 router.post('/check', (req, res) => {
  const token = req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks if token is expired
    jwt.verify(token, config.jwt.secret, function (err) {
      if (err) {
        return res.status(401).json({ error: true, message: 'Unauthorized access.' });
      }

      return res.status(200).json({ message: 'Token is valid.' });
    });
  } else {
    // if no token was included, send 403 unauthorized response.
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
});

module.exports = router;

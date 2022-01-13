const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Module that checks token validity. It acts as a filter for
 * unauthenticated requests and expired tokens.
 * 
 * @param req.headers {String} Access token generated at login.
 * @param res {401}{String} Access is denied based on current token status.
 * @param {*} next Token is valid. Continue.
 * @returns 
 */
module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  // check if token is included in request
  if (token) {
    // verifies secret and checks if token is expired
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: true, message: 'Unauthorized access.' });
      }
      req.decoded = decoded;
      // as token was successfully decoded, continue.
      next();
    });
  } else {
    // if no token was included, send 403 unauthorized response.
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
};

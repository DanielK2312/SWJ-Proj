const express = require('express');
const AuthGuard = require('../middleware/tokenChecker');

const router = express.Router();

router.use(AuthGuard);

router.get('/secret', (req, res, next) => {
  res.json('Secret Data');
});

module.exports = router;

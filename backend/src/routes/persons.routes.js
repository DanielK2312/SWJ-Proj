const express = require('express');
const Person = require('../models/person.model');
const AuthGuard = require('../middleware/tokenChecker');

const router = express.Router();

router.use(AuthGuard);

router.post('/create', (req, res, next) => {
  if (req.body.surname) {
    const newPerson = new Person(req.body);
    newPerson.save();
    res.status(200).json(newPerson);
  }
});

module.exports = router;

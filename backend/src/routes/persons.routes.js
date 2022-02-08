const express = require('express');
const Person = require('../models/person.model');
const AuthGuard = require('../middleware/tokenChecker');

const router = express.Router();

/**
 * API Route to list all persons.
 * @name /api/persons/list
 * @param req.headers ['x-access-token'] Authentication token.
 */
 router.get('/list', (req, res, next) => {
  Person.find({})
    .then((allPersons) => {
      res.status(200).json(allPersons);
    })
    .catch((err) => {
      // This should never fail for an authenticated user.
      res.status(418).json({ message: err });
    });
});

/**
 * API Route to get one person.
 * @name /api/persons/get/{ some mongodb _id }
 * @param req.headers ['x-access-token'] Authentication token.
 * @todo Add error for no person found.
 */
 router.get('/get/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.status(200).json(person);
    })
});

// Any routers/routes after this need to be authenticated.
// Current protected methods:
// - /create
// - /edit/:id
// - /delete/:id

router.use(AuthGuard);

/**
 * API Route to create a person.
 * @name /api/persons/create
 * @param req.headers ['x-access-token'] Authentication token.
 * @param req.body { ... See Person Schema }
 */
router.post('/create', (req, res, next) => {
  // Surname is the only required field to create a person.
  if (req.body.surname) {
    const newPerson = new Person(req.body);
    newPerson.save();
    res.status(200).json(newPerson);
  }
});

/**
 * API Route to update a person.
 * @name /api/persons/edit/{ some mongodb _id }
 * @param req.headers ['x-access-token'] Authentication token.
 * @param req.body { One or many fields from Person Schema }
 * @example Body: { pen_name: "cool name", firstname: "my name" }
 */
router.patch('/edit/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

/**
 * API Route to delete a person.
 * @name /api/persons/delete/{ some mongodb _id }
 * @param req.headers ['x-access-token'] Authentication token.
 * @param req.body { confirm_delete: true }
 */
router.delete('/delete/:id', (req, res, next) => {
  if (req.body.confirm_delete == "true") {
    Person.findOneAndDelete(
      { _id: req.params.id },
      function(err, result) {
        if (err) {
          res.status(418).send(err);
        } else {
          res.status(200).json({ result: "completed" });
        }
      })
  }
});

module.exports = router;

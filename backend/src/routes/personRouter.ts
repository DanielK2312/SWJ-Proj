import express from 'express';
import Person from '../models/personModel';

const personRouter = express.Router();
personRouter.get('/search/:surname', async (req, res, next) => {
    Person.find({ "surname": { "$regex": req.params.surname!, "$options": "i" } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
});
personRouter.get('/list', async (req, res, next) => {
    Person.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
    //
});
personRouter.post('/create', (req, res, next) => {
    // Surname is the only required field to create a person.
    if (req.body.surname) {
      const newPerson = new Person(req.body);
      newPerson.save();
      res.status(200).json(newPerson);
    }
});

export default personRouter;
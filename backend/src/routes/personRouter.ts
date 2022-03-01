import express from 'express';
import isLoggedIn from '../utils/authGuard';
import Person from '../models/personModel';

const personRouter = express.Router();

/**
 * Gets one person from the database by surname.
 * @remarks
 * GET /api/v1/person/byname/:surname
 *
 * @returns <JSON> { Person[] }
 */
personRouter.get('/byname/:surname', async (req, res, next) => {
    if (req.params.surname) {
        Person.find({ "surname": { "$regex": req.params.surname, "$options": "i" } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
    }
});

/**
 * Gets one person from the database by position.
 * @remarks
 * GET /api/v1/person/byposition/:position
 *
 * @returns <JSON> { Person[] }
 */
 personRouter.get('/byposition/:position', async (req, res, next) => {
    if (req.params.position) {
        Person.find({ "position": { "$regex": req.params.position, "$options": "i" } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
    }
});

/**
 * Gets one person from the database by date_range.
 * @remarks
 * GET /api/v1/person/bydate/:date_range
 *
 * @returns <JSON> { Person[] }
 */
 personRouter.get('/bydate/:date_range', async (req, res, next) => {
    if (req.params.date_range) {
        Person.find({ "date_range": req.params.date_range })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
    }
});


/**
 * Lists all persons from the database.
 * @remarks
 * GET /api/v1/person/list
 *
 * @returns <JSON> { Person[] }
 */
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

/**
 * Creates a person from the database.
 * @remarks
 * POST /api/v1/person/create [SECURE ROUTE]
 *
 * @param req.body.* - Fields of the person object.
 * @returns <JSON> { Person }
 */
personRouter.post('/create', isLoggedIn, (req, res, next) => {
    // Surname is the only required field to create a person.
    if (req.body.surname) {
        const newPerson = new Person(req.body);
        newPerson.save()
        res.status(200).json(newPerson);
    }
});

/**
 * Updates a person from the database.
 * @remarks
 * POST /api/v1/person/update [SECURE ROUTE]
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @param req.body.updates - JSON of only updated fields
 * @returns <JSON> { status, result } | { status, err }
 */
personRouter.post('/update', isLoggedIn, (req, res, next) => {
    // ID is mongoDB _id field
    // updates is a JSON like { surname: 'NewName' }
    const { id, updates } = req.body;
    const person = Person.findById(id);
    person.updateOne(updates)
        .then(result => {
            res.status(200).json({ status: 'success', result });
        })
        .catch(err => {
            res.status(500).json({ status: 'error', err })
        });
});

/**
 * Deletes a person from the database.
 * @remarks
 * GET /api/v1/person/delete [SECURE ROUTE]
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @returns <JSON> { status, result } | { status, err }
 */
personRouter.get('/delete', isLoggedIn, (req, res, next) => {
    const id = req.body;
    const person = Person.findById(id);
    person.deleteOne()
        .then(result => {
            res.status(200).json({ status: 'success', result });
        })
        .catch(err => {
            res.status(500).json({ status: 'error', err })
        });
});


export default personRouter;
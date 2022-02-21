"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personModel_1 = __importDefault(require("../models/personModel"));
const personRouter = express_1.default.Router();
/**
 * Gets one person from the database by surname.
 * @remarks
 * GET /api/v1/person/byname/:surname
 *
 * @returns <JSON> { Person[] }
 */
personRouter.get('/byname/:surname', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.surname) {
        personModel_1.default.find({ "surname": { "$regex": req.params.surname, "$options": "i" } })
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    }
}));
/**
 * Gets one person from the database by position.
 * @remarks
 * GET /api/v1/person/byposition/:position
 *
 * @returns <JSON> { Person[] }
 */
personRouter.get('/byposition/:position', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.position) {
        personModel_1.default.find({ "position": { "$regex": req.params.position, "$options": "i" } })
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    }
}));
/**
 * Gets one person from the database by date_range.
 * @remarks
 * GET /api/v1/person/bydate/:date_range
 *
 * @returns <JSON> { Person[] }
 */
personRouter.get('/bydate/:date_range', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.date_range) {
        personModel_1.default.find({ "date_range": req.params.date_range })
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    }
}));
/**
 * Lists all persons from the database.
 * @remarks
 * GET /api/v1/person/list
 *
 * @returns <JSON> { Person[] }
 */
personRouter.get('/list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    personModel_1.default.find({})
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ err });
    });
    //
}));
/**
 * Creates a person from the database.
 * @remarks
 * POST /api/v1/person/create
 *
 * @param req.body.* - Fields of the person object.
 * @returns <JSON> { Person }
 */
personRouter.post('/create', (req, res, next) => {
    // Surname is the only required field to create a person.
    if (req.body.surname) {
        const newPerson = new personModel_1.default(req.body);
        newPerson.save();
        res.status(200).json(newPerson);
    }
});
/**
 * Updates a person from the database.
 * @remarks
 * POST /api/v1/person/update
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @param req.body.updates - JSON of only updated fields
 * @returns <JSON> { status, result } | { status, err }
 */
personRouter.post('/update', (req, res, next) => {
    // ID is mongoDB _id field
    // updates is a JSON like { surname: 'NewName' }
    const { id, updates } = req.body;
    const person = personModel_1.default.findById(id);
    person.updateOne(updates)
        .then(result => {
        res.status(200).json({ status: 'success', result });
    })
        .catch(err => {
        res.status(500).json({ status: 'error', err });
    });
});
/**
 * Deletes a person from the database.
 * @remarks
 * GET /api/v1/person/delete
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @returns <JSON> { status, result } | { status, err }
 */
personRouter.get('/delete', (req, res, next) => {
    const id = req.body;
    const person = personModel_1.default.findById(id);
    person.deleteOne()
        .then(result => {
        res.status(200).json({ status: 'success', result });
    })
        .catch(err => {
        res.status(500).json({ status: 'error', err });
    });
});
exports.default = personRouter;
//# sourceMappingURL=personRouter.js.map
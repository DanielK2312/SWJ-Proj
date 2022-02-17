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
const mongoose_1 = __importDefault(require("mongoose"));
const personModel_1 = __importDefault(require("../models/personModel"));
const personRouter = express_1.default.Router();
personRouter.get('/search/:surname', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    personModel_1.default.find({ "surname": { "$regex": req.params.surname, "$options": "i" } })
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ err });
    });
}));
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
personRouter.post('/create', (req, res, next) => {
    // Surname is the only required field to create a person.
    if (req.body.surname) {
        const newPerson = new personModel_1.default(req.body);
        newPerson.save();
        res.status(200).json(newPerson);
    }
});
personRouter.get('/drop', (req, res, next) => {
    // Surname is the only required field to create a person.
    mongoose_1.default.connection.db.dropCollection('people', (err, result) => { console.log(err); });
    res.status(200).json({ status: 'success' });
});
exports.default = personRouter;
//# sourceMappingURL=personRouter.js.map
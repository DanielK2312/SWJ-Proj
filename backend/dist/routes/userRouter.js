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
const authGuard_1 = __importDefault(require("../utils/authGuard"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRouter = express_1.default.Router();
/**
 * Lists all users from the database.
 *
 * @remarks
 * GET /api/v1/user/list
 *
 * @returns <JSON> { User[] }
 */
userRouter.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel_1.default.find({})
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ err });
    });
}));
/**
 * Creates a user from the database.
 *
 * @remarks
 * POST /api/v1/user/create [SECURE ROUTE]
 *
 * @param req.body.* - Fields of the user object.
 * @returns <JSON> { User }
 */
// userRouter.post('/create', isLoggedIn, (req, res) => {
userRouter.post('/create', authGuard_1.default, (req, res) => {
    // Email is the only required field to create a User.
    if (req.body.email) {
        const newUser = new userModel_1.default(req.body);
        newUser.save();
        res.status(200).json(newUser);
    }
});
/**
 * Deletes a user from the database.
 *
 * @remarks
 * GET /api/v1/user/delete [SECURE ROUTE]
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @returns <JSON> { status, result } | { status, err }
 */
userRouter.post('/delete', authGuard_1.default, (req, res) => {
    const id = req.body.id;
    const user = userModel_1.default.findById(id);
    console.log('User: ' + user);
    user.deleteOne()
        .then(result => {
        res.status(200).json({ status: 'success', result: result });
    })
        .catch(err => {
        res.status(500).json({ status: 'error', err: err });
    });
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map
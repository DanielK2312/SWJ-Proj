"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const personRouter_1 = __importDefault(require("./personRouter"));
const API = (app) => {
    app.use('/api/v1/auth', authRouter_1.default);
    app.use('/api/v1/person', personRouter_1.default);
};
exports.default = API;
//# sourceMappingURL=API.js.map
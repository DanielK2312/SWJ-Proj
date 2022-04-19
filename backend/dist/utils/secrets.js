"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONN = exports.DB_NAME = exports.DB_URL = exports.DB_PASSWORD = exports.DB_USERNAME = exports.KEY2 = exports.KEY1 = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// All secrets are stored in the .env file for as to
// not hardcode secrets in the source code.
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '';
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '';
exports.KEY1 = process.env.KEY1 ? process.env.KEY1 : '';
exports.KEY2 = process.env.KEY2 ? process.env.KEY2 : '';
exports.DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : '';
exports.DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '';
exports.DB_URL = process.env.DB_URL ? process.env.DB_URL : '';
exports.DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : '';
exports.DB_CONN = 'mongodb+srv://' + exports.DB_USERNAME + ':' + exports.DB_PASSWORD + '@' + exports.DB_URL + '/' + exports.DB_NAME;
//# sourceMappingURL=secrets.js.map
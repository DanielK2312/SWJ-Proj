"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const path_1 = __importDefault(require("path"));
const API_1 = __importDefault(require("./routes/API"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const authGuard_1 = __importDefault(require("./utils/authGuard"));
const SECRETS = __importStar(require("./utils/secrets"));
const app = (0, express_1.default)();
// # - Database Setup -#
mongoose_1.default.connect(SECRETS.DB_CONN)
    .then(() => {
    console.log('connection to database established');
})
    .catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit(1);
});
// # - Authentication Middleware - #
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [SECRETS.KEY1, SECRETS.KEY2],
    maxAge: 7 * 24 * 60 * 60 * 1000
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// # - General Middleware -#
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// # - Security Middleware -#
const allowedOrigins = ['https://swj1894.org', 'https://beta.swj1894.org', 'http://localhost:3000'];
const options = { origin: allowedOrigins };
app.use((0, cors_1.default)(options));
app.use((0, express_mongo_sanitize_1.default)());
// # - Serve Static Pages -#
app.use('/admin', authGuard_1.default, express_1.default.static(path_1.default.join(__dirname, '/../../admin')));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '/../../frontend')));
app.use('/favicon.ico', express_1.default.static(path_1.default.join(__dirname, '/../../admin/favicon.ico')));
// API Routes
(0, API_1.default)(app);
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port: ', process.env.PORT || 3000);
});
//# sourceMappingURL=app.js.map
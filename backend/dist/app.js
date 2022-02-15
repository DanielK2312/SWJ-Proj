"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const path_1 = __importDefault(require("path"));
const API_1 = __importDefault(require("./routes/API"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const authGuard_1 = __importDefault(require("./utils/authGuard"));
const secrets_1 = require("./utils/secrets");
const app = (0, express_1.default)();
// # - Database Setup -#
const dbURL = "mongodb+srv://admin:INEEDROOT@cluster0.gnboq.mongodb.net/myFirstDatabase";
mongoose_1.default.connect(dbURL)
    .then(() => {
    console.log("connection to database established");
})
    .catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit(1);
});
// # - Authentication Middleware - #
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [secrets_1.KEY1, secrets_1.KEY2],
    maxAge: 7 * 24 * 60 * 60 * 1000
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// # - General Middleware -#
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// # - Security Middleware -#
const allowedOrigins = ['http://localhost:3000', 'https://swj-capstone-staging.herokuapp.com'];
const options = { origin: allowedOrigins };
app.use((0, cors_1.default)(options));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        scriptSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
            '\'unsafe-eval\'',
        ],
        imgSrc: ['*', 'blob:', 'data:'],
    },
}));
app.use((0, express_mongo_sanitize_1.default)());
// # - Serve Static Pages -#
app.use('/admin', authGuard_1.default, express_1.default.static(path_1.default.join(__dirname, '/../../admin')));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '/../../frontend')));
// API Routes
(0, API_1.default)(app);
app.listen(3000, () => {
    console.log("App listening on port: " + 3000);
});
//# sourceMappingURL=app.js.map
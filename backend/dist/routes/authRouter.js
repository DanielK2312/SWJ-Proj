"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const secrets_1 = require("../utils/secrets");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const authRouter = express_1.default.Router();
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use(new GoogleStrategy({
    clientID: secrets_1.GOOGLE_CLIENT_ID,
    clientSecret: secrets_1.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/redirect",
    scope: ['profile']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
authRouter.get('/', passport_1.default.authenticate('google'));
authRouter.get('/error', (req, res) => res.send('Unknown Error'));
authRouter.get('/redirect', passport_1.default.authenticate('google', { failureRedirect: '/auth/error' }), (req, res) => {
    // Store user in a cookie session that expires in 7 days.
    if (req.session) {
        req.session.user = req.user;
    }
    res.redirect('/admin');
});
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map
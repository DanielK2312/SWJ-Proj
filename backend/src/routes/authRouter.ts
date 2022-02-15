import express from 'express';
import passport from 'passport';
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
const GoogleStrategy = passportGoogle.Strategy;

const authRouter = express.Router();

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/redirect",
    scope: ['profile']
},
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
        const tokens = {
            accessToken,
            refreshToken,
        }
        return done(null, profile);
    }
));

authRouter.get('/', passport.authenticate('google'));
authRouter.get('/error', (req, res) => res.send('Unknown Error'))
authRouter.get('/redirect',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
        // Store user in a cookie session that expires in 7 days.
        req.session!.user = req.user;
        res.redirect('/admin');
    }
);
authRouter.post('/check', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ status: 'valid' });
    } else {
        console.log('No session found.');
        res.status(401).json({ status: 'invalid' });
    }
})

export default authRouter;
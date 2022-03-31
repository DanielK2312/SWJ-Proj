import express from 'express'
import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../utils/secrets'
const GoogleStrategy = passportGoogle.Strategy

const authRouter = express.Router()

passport.serializeUser((user: any, done) => {
  done(null, user)
})

passport.deserializeUser((user: any, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
<<<<<<< HEAD
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://swj1894.org/api/v1/auth/redirect",
    scope: ['profile']
=======
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/redirect',
  scope: ['profile']
>>>>>>> sprint4
},
(accessToken: string, refreshToken: string, profile, done) => {
  return done(null, profile)
}
))

authRouter.get('/', passport.authenticate('google'))
authRouter.get('/error', (req, res) => res.send('Unknown Error'))
authRouter.get('/redirect',
  passport.authenticate('google', { failureRedirect: '/auth/error' }),
  (req, res) => {
    // Store user in a cookie session that expires in 7 days.
    if (req.session) {
      req.session.user = req.user
    }
    res.redirect('/admin')
  }
)

export default authRouter

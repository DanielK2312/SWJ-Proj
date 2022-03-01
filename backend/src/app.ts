import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanatize from 'express-mongo-sanitize';
import path from 'path';
import API from './routes/API';
import cookieSession from 'cookie-session';
import passport from 'passport';
import authGuard from './utils/authGuard';
import { KEY1, KEY2 } from './utils/secrets';

const app = express();

// # - Database Setup -#
const dbURL: string = "mongodb+srv://admin:INEEDROOT@cluster0.gnboq.mongodb.net/SWJ"
mongoose.connect(dbURL)
.then(() => {
    console.log("connection to database established");})
.catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit(1);});

// # - Authentication Middleware - #

app.use(cookieSession({
    name: 'session',
    keys: [KEY1, KEY2],
    maxAge: 7 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

// # - General Middleware -#
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// # - Security Middleware -#
const allowedOrigins = ['http://localhost:3000', 'https://swj-capstone-staging.herokuapp.com'];
const options: cors.CorsOptions = { origin: allowedOrigins };
app.use(cors(options));
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       scriptSrc: [
//         '\'self\'',
//         '\'unsafe-inline\'',
//         '\'unsafe-eval\'',
//       ],
//       imgSrc: ['*', 'blob:', 'data:'],
//     },
// }));
app.use(mongoSanatize());

// # - Serve Static Pages -#
app.use('/admin', authGuard, express.static(
    path.join(__dirname, '/../../admin')
));
app.use('/', express.static(
    path.join(__dirname, '/../../frontend')
));

app.use('/favicon.ico', express.static(
    path.join(__dirname, '/../../admin/favicon.ico')
));

// API Routes
API(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("App listening on port: " + process.env.PORT || 3000);
});
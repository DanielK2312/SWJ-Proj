const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const logger = require('./config/logger');
const config = require('./config/config');
const morgan = require('./config/morgan');
const authRoute = require('./routes/auth.routes');
const secureRoute = require('./routes/secure.routes');
require('./config/passport');

const app = express();

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

app.use(morgan.successHandler); // HTTP API request success logging
app.use(morgan.errorHandler); // HTTP API request failure logging
app.use(helmet()); // set security HTTP headers
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body
app.use(xss()); // sanitize request data
app.use(mongoSanitize()); // sanitize database data
app.use(compression()); // gzip compression

// enable cors
app.use(cors());
app.options('*', cors());

// api authentication endpoint
app.use('/api/auth', authRoute);

// api secure endpoint [must be logged in to access]
app.use('/api/secure', passport.authenticate('jwt', { session: false }), secureRoute);

module.exports = app;

const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

/**
 * Outputs HTTP status code and accessed route from express.
 * 
 * More information here: 
 *    https://github.com/expressjs/morgan
 */

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};

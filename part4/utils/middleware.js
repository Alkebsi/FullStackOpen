const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error('logger', error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'Malformated Username and/or Password' });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};

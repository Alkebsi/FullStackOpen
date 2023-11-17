require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error('logger', error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
    request.decodedToken = jwt.verify(request.token, process.env.SECRET);
  } else {
    request.token = null;
  }

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
};

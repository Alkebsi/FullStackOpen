const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
// const notesRouter = require('./controllers/notes')
// const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

mongoose.set('strictQuery', false);

logger.info(`Connecting to ${config.MONGODB_URI}`);

// -- will go to there own modules soon --//

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// -- will go to there own modules soon --//

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB Successfully');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
// app.use(middleware.requestLogger);

module.exports = app;

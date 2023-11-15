const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: 'content missing' });
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;

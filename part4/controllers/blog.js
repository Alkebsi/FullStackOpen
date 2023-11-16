const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Getting all the blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

// Creating a new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.url || !blog.title) {
    response.status(400).json({ error: 'content missing' });
  } else {
    blog.user = '6555bb96dafda5e49e8494e9';

    const result = await blog.save();
    console.log(blog, result);

    response.status(201).json(result);
  }
});

// Deleting a blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

// Updating a blog
blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;

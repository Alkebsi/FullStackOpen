const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// Getting all the blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

// Creating a new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const user = await User.findById(request.body.userId);
  console.log(user);
  if (!blog.url || !blog.title) {
    response.status(400).json({ error: 'content missing' });
  } else {
    blog.user = user.id;

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
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

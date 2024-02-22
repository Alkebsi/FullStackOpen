const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if(!request.user) {
    return response.status(401).send('For this you need to be logged in')
  }
  const user = request.user
  const body = request.body
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes | 0,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  if(!request.user) {
    return response.status(401).send('For this you need to be logged in')
  }
  if(!request.user.blogs.find(blog => String(blog) === request.params.id)) {
    return response.status(401).send('You dont own this blog')
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const existingBlog = await Blog.findById(request.params.id)
  if((existingBlog.title !== request.body.title) || (existingBlog.author !== request.body.author) || (existingBlog.url !== request.body.url)) {
    if(!request.user) {
      return response.status(401).send('For this you need to be logged in')
    }else if(!request.user.blogs.find(blog => String(blog) === request.params.id)) {
      return response.status(404).send('non existent ID')
    }
    return response.status(403).send('Not your blog')
  }
  const body = request.body
  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  if(updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).send('non exitent ID')
  }
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  response.json(blog)
})

blogRouter.post('/:id/comment', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog.comments) {
    blog.comments = []
  }
  console.log(request.body.comment)
  blog.comments.push(request.body.comment)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter
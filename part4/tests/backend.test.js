const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

// Making sure the database is equal to the inital blogs
beforeEach(async () => {
  await Blog.deleteMany();
  let blogObject = new Blog(helper.initialBloglist[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBloglist[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBloglist[2]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBloglist[3]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBloglist[4]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBloglist[5]);
  await blogObject.save();
});

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs have a id than _id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a blog post can be added', async () => {
  const newBlog = {
    title: 'Getting Started with CEP Extensions',
    author: 'Adobe Community',
    url: 'https://github.com/Adobe-CEP/Getting-Started-guides',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map((p) => p.title);

  expect(response.body).toHaveLength(helper.initialBloglist.length + 1);
  expect(contents).toContain('Getting Started with CEP Extensions');
});

test('if likes is missing, it defualts to 0', async () => {
  const newBlog = {
    title: 'Getting Started with CEP Extensions',
    author: 'Adobe Community',
    url: 'https://github.com/Adobe-CEP/Getting-Started-guides',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const { likes } = response.body[helper.initialBloglist.length];

  expect(likes).toBe(0);
});

test('if titile or url is missing, request fails with 400', async () => {
  const newBlog = {
    url: 'https://github.com/Adobe-CEP/Getting-Started-guides',
    likes: 8,
    author: 'Adobe Community',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('if id is valid, deleted successfully with code 201', async () => {
  const blogsInDB = await helper.blogsDB();
  const blogToDelete = blogsInDB[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsFinalResult = await helper.blogsDB();

  expect(blogsFinalResult).toHaveLength(helper.initialBloglist.length - 1);

  const titles = blogsFinalResult.map((p) => p.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test('a blog post can be updated', async () => {
  const blogsInDB = await helper.blogsDB();
  const blogToUpdate = blogsInDB[0];

  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`, updatedBlog).expect(200);

  const blogsFinalResult = await helper.blogsDB();

  expect(blogsFinalResult[0].likes).toBe(updatedBlog.likes - 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});

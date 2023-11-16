const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

// Making sure the database is equal to the inital blogs
beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(helper.initialBloglist);

  await User.deleteMany();
  helper.initialUsers.map(async (user) => {
    await api.post('/api/users').send(user);
  });
});

// -- Blog Tests -- //
describe('Blogs First CRUD Stage, Create!', () => {
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
});

describe('Blogs Second CRUD Stage, Read!', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have a valid id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('Blogs Third CRUD Stage, Update!', () => {
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
});

describe('Blogs Last CRUD Stage, Delete', () => {
  test('if id is valid, deleted successfully with code 201', async () => {
    const blogsInDB = await helper.blogsDB();
    const blogToDelete = blogsInDB[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsFinalResult = await helper.blogsDB();

    expect(blogsFinalResult).toHaveLength(helper.initialBloglist.length - 1);

    const titles = blogsFinalResult.map((p) => p.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

// -- User Tests -- //
describe('Users First CRUD Stage, Create!', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'MKebsi',
      name: 'Mohammed Alkebsi',
      password: 'Nladjo999',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    const usernames = response.body.map((p) => p.username);

    expect(response.body).toHaveLength(helper.initialUsers.length + 1);
    expect(usernames).toContain('MKebsi');
  });

  test('invalid users are not added', async () => {
    const newInvalidUser = {
      username: 'De',
      name: 'Jackson D',
      // mssing password
    };

    await api
      .post('/api/users')
      .send(newInvalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

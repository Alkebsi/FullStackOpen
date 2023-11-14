const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

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

afterAll(async () => {
  await mongoose.connection.close();
});

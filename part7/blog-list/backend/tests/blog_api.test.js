const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const api = supertest(app)

const blogs = helper.blogs

let valid_code = ''
let invalid_code = ''

beforeEach(async () => {
  await User.deleteMany({})

  const InvalidpasswordHash = await bcrypt.hash('sekret', 10)
  const Invaliduser = new User({ username: 'invalid', InvalidpasswordHash })
  await Invaliduser.save()
  const InvaliduserForToken = {
    username: Invaliduser.username,
    id: Invaliduser._id,
  }
  invalid_code = jwt.sign(InvaliduserForToken, process.env.SECRET)

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  let blogIDS = []
  valid_code = jwt.sign(userForToken, process.env.SECRET)
  await Blog.deleteMany({})
  for (let i = 0; i < blogs.length; i++) {
    blogs[i].user = user._id
    let blogObject = new Blog(blogs[i])
    await blogObject.save()
    blogIDS = blogIDS.concat(blogObject._id)
  }
  user.blogs = blogIDS
  await user.save()

})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'First class tests'
    )
  })
})

describe('addition of a new blog', () => {
  test('a Post blog gets corectly written to the dtabase', async () => {
    const firstResponse = await api.get('/api/blogs')
    const blog = {
      title: 'Test Blog345765',
      author: 'Test Blog Author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 8
    }
    await api.post('/api/blogs').set('Authorization', 'Bearer ' + valid_code).send(blog).expect(201)
    const response = await api.get('/api/blogs')
    const result = response.body.find(value => value.title === blog.title)
    delete result.id
    expect(response.body.length).toBe(firstResponse.body.length + 1)
    delete result.user
    expect(result).toEqual(blog)
  })

  test('likes defaults to 0 when not defined', async () => {
    const blog = {
      title: 'Test Blog37',
      author: 'Test Blog Author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api.post('/api/blogs').set('Authorization', 'Bearer ' + valid_code).send(blog).expect(201)
    const response = await api.get('/api/blogs')
    const result = response.body.find(value => value.title === blog.title)
    expect(result.likes).toBe(0)
  })

  test('url can not be empty', async () => {
    const blog = {
      title: 'Test Blog37',
      author: 'Test Blog Author'
    }
    await api.post('/api/blogs').send(blog).set('Authorization', 'Bearer ' + valid_code).expect(400)
  })

  test('title can not be empty', async () => {
    const blog = {
      author: 'Test Blog Author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api.post('/api/blogs').send(blog).set('Authorization', 'Bearer ' + valid_code).expect(400)
  })
  test('needs to be logged in', async () => {
    const blog = {
      title: 'hallo',
      author: 'Test Blog Author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api.post('/api/blogs').send(blog).expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with a status code of 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', 'Bearer ' + valid_code)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.blogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
  test('fails when invalid token is given', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', 'Bearer ' + invalid_code)
      .expect(401)
  })
})

describe('edit of a blog post', () => {
  test('title edit succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToEdit = blogsAtStart[1]
    blogToEdit.title = 'newEditedTitle'

    await api.put(`/api/blogs/${blogToEdit.id}`).send(blogToEdit).set('Authorization', 'Bearer ' + valid_code)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(blogToEdit.title)
  })

  test('author edit succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToEdit = blogsAtStart[1]
    blogToEdit.author = 'newEditedTitle'

    await api.put(`/api/blogs/${blogToEdit.id}`).send(blogToEdit).set('Authorization', 'Bearer ' + valid_code)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map(r => r.author)
    expect(authors).toContain(blogToEdit.author)
  })

  test('url edit succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToEdit = blogsAtStart[1]
    blogToEdit.url = 'newEditedTitle'

    await api.put(`/api/blogs/${blogToEdit.id}`).send(blogToEdit).set('Authorization', 'Bearer ' + valid_code)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).toContain(blogToEdit.url)
  })

  test('likes edit succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToEdit = blogsAtStart[1]
    blogToEdit.likes = 200

    await api.put(`/api/blogs/${blogToEdit.id}`).send(blogToEdit).set('Authorization', 'Bearer ' + valid_code)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(r => r.likes)
    expect(likes).toContain(blogToEdit.likes)
  })

  test('update with invalid id results in status code 400', async () => {
    const id = await helper.nonExistingId()
    const updateBlog = helper.blogs[2]
    await api.put(`/api/blogs/${id}`).set('Authorization', 'Bearer ' + valid_code).send(updateBlog)
      .expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
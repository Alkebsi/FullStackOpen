const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


// beforeEach(async () => {
//   await Users.deleteMany({})
//   for (let i = 0; i < users.length; i++) {
//     let blogObject = new User(users[i])
//     await blogObject.save()
//   }
// })

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a used username', async () => {
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

describe('when creating a user', () => {
  test('creating with no username or a usernmae shorter than 3 characters gets status 400', async () => {
    let newUser = {
      username: '',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.username = '12'

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creating with no password or a password shorter than 3 characters gets status 400', async () => {
    let newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.username = '12'

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
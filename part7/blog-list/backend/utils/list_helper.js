// const blogs = require('../models/blogs')

const dummy = () => {
  return 1
}

const totalLikes = blogs =>
  blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)

const favoriteBlog = blogs => {
  const max = Math.max(...blogs.map(blog => blog.likes))
  const index = blogs.findIndex(blog => blog.likes === max)
  return blogs[index] || null
}

const mostBlogs = blogs => {
  let authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] + 1 || 1
  })
  const max = Math.max(...Object.values(authors))
  const result = Object.entries(authors).find(author => author[1] === max)
  return result ? { author: result[0], blogs: Number(result[1]) } : null
}

const mostLikes = blogs => {
  let authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] + blog.likes || blog.likes
  })
  const max = Math.max(...Object.values(authors))
  const result = Object.entries(authors).find(author => author[1] === max)
  return result ? { author: result[0], likes: Number(result[1]) } : null
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

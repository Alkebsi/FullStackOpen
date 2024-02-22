import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link, useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <ListGroup.Item>
    <b>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} By {blog.author}{' '}
      </Link>
    </b>
  </ListGroup.Item>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

const User = () => {
  const [user, setUser] = useState()
  const id = useParams().id

  useEffect(() => {
    const getUser = async () => {
      setUser(await userService.getUser(id))
    }
    getUser()
  }, [id])

  if (!user) return null

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Added Blogs</h2>
      <ListGroup bg="secondary">
        {user.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ListGroup>
    </div>
  )
}

export default User

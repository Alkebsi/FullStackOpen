import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h2>Blogs</h2>
      <ListGroup bg="secondary">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </ListGroup>
    </div>
  )
}

export default Blogs

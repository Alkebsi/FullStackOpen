import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useState } from 'react'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) return null

  const likeHandle = () => {
    const blogObject = { ...blog }
    delete blogObject.user
    dispatch(likeBlog({ ...blogObject, likes: blogObject.likes + 1 }))
  }

  const deleteHandle = () => {
    if (window.confirm(`Remove blog ${blog.title} By ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const commentHandle = (event) => {
    event.preventDefault()
    dispatch(commentBlog(comment, blog))
  }

  const isOwner =
    user && blog.user ? (blog.user.id === user.id ? true : false) : false

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a rel="noreferrer" target="_blank" href={blog.url}>
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes}
        <button onClick={likeHandle}>Like</button>
      </div>
      <div>Added by: {blog.user ? blog.user.username : 'Deleted'}</div>
      {isOwner && <button onClick={deleteHandle}>Delete</button>}
      <h3>Comments</h3>
      <form onSubmit={commentHandle}><input value={comment} onChange={(event) => setComment(event.target.value)}/><button>Add Comment</button></form>
      {blog.comments && <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>}
    </div>
  )
}

export default Blog

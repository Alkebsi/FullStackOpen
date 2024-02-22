import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    // createBlog(blogObject)
    dispatch(createBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h1>Create A New Blog</h1>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" name="url" />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>

        {/* <div>
        title
        <input
          type='text'
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
          id='title'
        />
      </div>
      <div>
        author
        <input
          type='text'
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
          id='author'
        />
      </div>
      <div>
        url
        <input
          type='text'
          name='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
          id='url'
        />
      </div>
      <button id='blog-save-button' type="submit">save</button> */}
      </Form>
    </div>
  )
}

export default BlogForm

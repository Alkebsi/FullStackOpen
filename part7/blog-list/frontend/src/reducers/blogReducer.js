import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likedBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    changeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removedBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const {
  appendBlog,
  voteBlog,
  setBlogs,
  changeBlog,
  removedBlog,
  likedBlog,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(`Succesvolly Created blog ${blog.title}`, 5000, 'success')
      )
    } catch (error) {
      dispatch(
        setNotification(`Error Creating blog: ${error.message}`, 5000, 'danger')
      )
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.put(blog.id, blog)
      dispatch(likedBlog(updatedBlog))
      dispatch(
        setNotification(`Succesvolly Liked blog ${blog.title}`, 5000, 'success')
      )
    } catch (error) {
      dispatch(
        setNotification(`Error Liking blog: ${error.message}`, 5000, 'danger')
      )
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removedBlog(blog.id))
      dispatch(
        setNotification(`Succesvolly Deleted blog ${blog.title}`, 5000, 'success')
      )
    } catch (error) {
      dispatch(
        setNotification(`Error Deleting blog: ${error.message}`, 5000, 'danger')
      )
    }
  }
}

export const commentBlog = (comment, blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.comment(comment, blog.id)
      dispatch(changeBlog({ ...response, user: blog.user }))
      dispatch(
        setNotification(
          `sucesvolly commented ${comment} on ${response.title}`,
          5000,
          'success'
        )
      )
    } catch (error) {
      dispatch(
        setNotification(`Failed to commented: ${error.message}`, 5000, 'danger')
      )
    }
  }
}

export default blogSlice.reducer

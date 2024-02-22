// import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'resting',
    likes: 5,
    url: 'https://google.com',
    user: {
      id: '1234',
      username: 'piet kat',
    }
  }

  const mockUser = {
    id: '1234',
    username: 'piet kat',
  }

  let mockDeleteHandler
  let likeBlog
  let user

  beforeEach(() => {
    mockDeleteHandler = jest.fn()
    likeBlog = jest.fn()
    render(<Blog blog={blog} user={mockUser} deleteBlog={mockDeleteHandler} likeBlog={likeBlog} />)
    user = userEvent.setup()
  })

  test('renders content', async () => {
    screen.getByText(`${blog.title} By ${blog.author}`)
    const notRendered = screen.queryByText('https://google.com')
    expect(notRendered).toBeNull()
    const likesRendered = screen.queryByText('likes: 5')
    expect(likesRendered).toBeNull()
  })
  test('view/delete button', async () => {

    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    screen.getByText('User: piet kat')
    screen.getByText('https://google.com')
    screen.getByText('likes: 5')
    // const deleteButton = screen.getByText('Delete')
    // await user.click(deleteButton)
    // jest.spyOn(global, 'confirm', 'get').mockReturnValueOnce(true);
    // expect(mockDeleteHandler.mock.calls).toHaveLength(1)
  })
  test('like button', async () => {
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
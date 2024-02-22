import { useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import {} from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userLogout } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  console.log(window.location.pathname)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      dispatch(setUser(userLogged))
      blogService.setToken(userLogged.token)
    }
  }, [])

  useEffect(() => { dispatch(initializeBlogs()) }, [])

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="secondary" text-bg="blue" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand href="#">Blogs</Navbar.Brand>
            <Nav variant="pills" className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/create-new">
                  Create Blog
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* <Navbar.Toggle /> */}
          {user ? (
            <Navbar.Collapse className="justify-content-end">
              <LinkContainer to={`/users/${user.id}`}>
                <Navbar.Text>Signed in as: {user.name}</Navbar.Text>
              </LinkContainer>
              <Button onClick={() => dispatch(userLogout())}>Logout</Button>
            </Navbar.Collapse>
          ) : null}
        </Container>
      </Navbar>
      <Notification />

      <Routes>
        <Route path="/create-new" element={<BlogForm />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App

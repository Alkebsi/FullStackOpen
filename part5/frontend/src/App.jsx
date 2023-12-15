import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlog from './components/AddBlog';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [update, setUpdate] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));

    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [update]);

  const onUsernameChange = ({ target }) => setUsername(target.value);
  const onPasswordChange = ({ target }) => setPassword(target.value);

  const blogsFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // Saving user to the local storage
      localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    const ensure = confirm(`${user.name}, Are you sure you want to logout?`);
    if (ensure) {
      localStorage.clear();
      location.reload();
    }
  };

  const handleNewBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);

    setBlogs(blogs.concat(newBlog));

    setSuccessMessage(`a blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    setUpdate(update + 1);

    blogsFormRef.current.toggleVisibility();
  };

  const handleLikes = (e) => {
    const likes = () => {
      const updatedBlogDetails = {
        author: e.author,
        likes: e.likes + 1,
        title: e.title,
        url: e.url,
      };

      blogService.update(e.id, updatedBlogDetails);
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    };

    return likes;
  };

  const handleDeletion = (blog) => {
    const remove = () => {
      const ensure = confirm(`Remove blog ${blog.title} by ${blog.author}`);

      if (ensure) {
        blogService.remove(blog.id);
        setUpdate(update + 1);
      } else {
        return;
      }
    };

    return remove;
  };

  return (
    <>
      <div>
        {errorMessage !== null ? (
          <div className="error">{errorMessage}</div>
        ) : null}
        {successMessage !== null ? (
          <div className="success">{successMessage}</div>
        ) : null}
      </div>

      {user !== null && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Togglable buttonLable="new blog" ref={blogsFormRef}>
            <AddBlog handleNewBlog={handleNewBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              handleDeletion={handleDeletion}
              user={user}
            />
          ))}
        </div>
      )}

      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          username={username}
          password={password}
        />
      )}
    </>
  );
};

export default App;

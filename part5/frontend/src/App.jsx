import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Bloglist from './components/Bloglist';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [update, setUpdate] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [update]);

  const onUsernameChange = ({ target }) => setUsername(target.value);
  const onPasswordChange = ({ target }) => setPassword(target.value);

  const onTitleChange = ({ target }) => setTitle(target.value);
  const onAuthorChange = ({ target }) => setAuthor(target.value);
  const onUrlChange = ({ target }) => setUrl(target.value);

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

  const handleNewBlog = (e) => {
    e.preventDefault();

    blogService.create({
      title,
      author,
      url,
    });

    setSuccessMessage(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    setTitle('');
    setAuthor('');
    setUrl('');
    setUpdate(update + 1);

    blogsFormRef.current.toggleVisibility();
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
            <Bloglist
              args={{
                handleNewBlog,
                onTitleChange,
                onAuthorChange,
                onUrlChange,
                title,
                author,
                url,
              }}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {user === null && (
        <LoginForm
          args={{
            handleLogin,
            onUsernameChange,
            onPasswordChange,
            username,
            password,
          }}
        />
      )}
    </>
  );
};

export default App;

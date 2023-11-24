import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
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
  };

  const bloglist = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {addBlog()}
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const addBlog = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

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
      {user !== null && bloglist()}
      {user === null && (
        <LoginForm
          args={{handleLogin, onUsernameChange, onPasswordChange, username, password}}
        />
      )}
    </>
  );
};

export default App;

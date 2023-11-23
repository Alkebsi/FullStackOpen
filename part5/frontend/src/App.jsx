import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Wrong credentials');
    }

    console.log(user);
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );

  const bloglist = () => (
    <div>
      <h2>blogs</h2>
      <p> {user.name} is logged in </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <>
    {user !== null && bloglist()}
    {user === null && loginForm()}
  </>;
};

export default App;

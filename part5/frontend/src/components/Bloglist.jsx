import Blog from './Blog';
import AddBlog from './AddBlog';
import Togglable from './Togglable';

const Bloglist = ({ args }) => {
  const {
    user,
    handleLogout,
    handleNewBlog,
    onTitleChange,
    onAuthorChange,
    onUrlChange,
    title,
    author,
    url,
    blogs,
  } = args;

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLable="new blog">
        <AddBlog
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

      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default Bloglist;

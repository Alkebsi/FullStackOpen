import Blog from './Blog';
import AddBlog from './AddBlog';

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

      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default Bloglist;

import { useRef } from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogsRef = useRef();

  return (
    <div
      style={{
        border: '2px solid black',
        borderRadius: '10px',
        margin: '10px 0',
        padding: '10px',
      }}
    >
      {blog.title}
      <Togglable buttonLable="view" ref={blogsRef}>
        {blog.url}
        <br />
        likes {blog.likes} &nbsp;
        <button>like</button>
        <br />
        {blog.author} &nbsp;
      </Togglable>
    </div>
  );
};
export default Blog;

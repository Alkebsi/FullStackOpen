import { useState } from 'react';

const Blog = ({ blog, handleLikes, handleDeletion }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const content = () => {
    if (visible) {
      return (
        <div id="blogs">
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} &nbsp;
          <button onClick={handleLikes(blog)}>like</button>
          <br />
          {blog.user.name} &nbsp;
          <br />
          <button onClick={handleDeletion(blog)}>remove</button>
        </div>
      );
    } else {
      return <button onClick={toggleVisibility}>show</button>;
    }
  };

  return (
    <div
      style={{
        border: '2px solid black',
        borderRadius: '10px',
        margin: '10px 0',
        padding: '10px',
      }}
    >
      {blog.title} {blog.author} &nbsp;
      {content()}
    </div>
  );
};
export default Blog;

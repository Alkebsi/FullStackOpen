import { useState } from 'react';

const Blog = ({ blog, handleLikes }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const content = () => {
    if (visible) {
      return (
        <>
          <button onClick={toggleVisibility}>hide</button><br />
          {blog.url}
          <br />
          likes {blog.likes} &nbsp;
          <button onClick={handleLikes(blog)}>like</button>
          <br />
          {blog.user.name} &nbsp;
        </>
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

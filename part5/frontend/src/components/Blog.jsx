import { useState } from 'react';

const Blog = ({ blog, handleLikes, handleDeletion, user }) => {
  const [visible, setVisible] = useState(false);

  let remove = null;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const content = () => {
    if (visible) {
      if (user.name === blog.user.name) {
        remove = <button onClick={handleDeletion(blog)}>remove</button>;
      }
      return (
        <>
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} &nbsp;
          <button onClick={handleLikes(blog)} className="like-button">like</button>
          <br />
          {blog.user.name} &nbsp;
          <br />
          {remove}
        </>
      );
    } else {
      return <button onClick={toggleVisibility}>show</button>;
    }
  };

  return (
    <div
      className="blogs"
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

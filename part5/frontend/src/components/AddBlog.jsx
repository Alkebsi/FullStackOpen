import { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlog = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();

    handleNewBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title here..."
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author here..."
            required
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL here..."
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = { handleNewBlog: PropTypes.func.isRequired };

export default AddBlog;

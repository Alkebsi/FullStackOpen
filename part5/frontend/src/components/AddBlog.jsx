import PropTypes from 'prop-types';

const AddBlog = ({
  handleNewBlog,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            placeholder="Title here..."
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={onAuthorChange}
            placeholder="Author here..."
            required
          />
        </div>
        <div>
          url:
          <input type="url" value={url} onChange={onUrlChange} placeholder="URL here..." required />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAuthorChange: PropTypes.func.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AddBlog;

const AddBlog = ({ args }) => {
  const {
    handleNewBlog,
    onTitleChange,
    onAuthorChange,
    onUrlChange,
    title,
    author,
    url,
  } = args;

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
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={onAuthorChange}
            required
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            onChange={onUrlChange}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddBlog;

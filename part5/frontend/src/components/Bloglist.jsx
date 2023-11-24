import AddBlog from './AddBlog';

const Bloglist = ({ args }) => {
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
  );
};
export default Bloglist;

import PropTypes from 'prop-types';
import AddBlog from './AddBlog';

const Bloglist = ({
  handleNewBlog,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  title,
  author,
  url,
}) => {
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

Bloglist.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAuthorChange: PropTypes.func.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Bloglist;

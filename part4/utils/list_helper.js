// Input: blogs, Output: 1
const dummy = () => 1;

// Input: blogs, Output: the total number of likes
const totalLikes = (bloglist) => {
  const likes = bloglist.map((p) => p.likes);
  const sum = (x, y) => x + y;

  return likes.reduce(sum);
};

// Input: blogs, Ouput: best blog (with the most likes)
const favoriteBlog = (bloglist) => {
  const favorates = bloglist.map((p) => p);
  const numberOfLikes = bloglist.map((p) => p.likes);

  const bestLikes = Math.max(...numberOfLikes);
  const bestPost = favorates.find((p) => p.likes === bestLikes);

  const result = {
    title: bestPost.title,
    author: bestPost.author,
    likes: bestPost.likes,
  };

  return result;
};

// Input: blogs, Output: author with most blogs + post's number
const mostBlogs = (bloglist) => {
  let authors = bloglist.map((blog) => blog.author);
  authors = [...new Set(authors)];

  const numberOfPosts = new Array(authors.length).fill(0);

  // I had to break the rules here, sorry!
  // eslint-disable-next-line no-return-assign
  bloglist.map((p) => numberOfPosts[authors.indexOf(p.author)] += 1);

  const index = numberOfPosts.indexOf(Math.max(...numberOfPosts));

  const result = {
    author: authors[index],
    blogs: numberOfPosts[index],
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

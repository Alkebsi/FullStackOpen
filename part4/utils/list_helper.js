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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

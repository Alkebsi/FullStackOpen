const dummy = () => 1;

const totalLikes = (bloglist) => {
  const likes = bloglist.map((p) => p.likes);
  const sum = (x, y) => x + y;

  return likes.reduce(sum);
};

module.exports = {
  dummy,
  totalLikes,
};

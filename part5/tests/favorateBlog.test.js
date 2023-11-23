const listHelper = require('../utils/list_helper');

describe('favorate post', () => {
  const listOfManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 11,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Is Living better than death?',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 55,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Best Blog of the Year',
      author: 'Doctor JR. Someoneson',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 58,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0,
    },
  ];

  test('best blog, equals the most liked blog', () => {
    const result = listHelper.favoriteBlog(listOfManyBlogs);
    expect(result).toEqual({
      author: 'Doctor JR. Someoneson',
      likes: 58,
      title: 'Best Blog of the Year',
    });
  });
});

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../../components/Blog';

describe('rendering blogs', () => {
  test('renders blog title + author, only', () => {
    const blog = {
      title: 'Type wars II',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 20,
      user: {
        name: 'Mohammed Alkebsi',
        username: 'MKebsi',
        password: 'malkebsi',
      },
    };

    const handleLikes = () => {
      console.log('likes are handled successfully');
    };

    const handleDeletion = () => {
      console.log('Deletion is handled successfully');
    };

    const element = render(
      <Blog
        blog={blog}
        handlelikes={handleLikes}
        handleDeletion={handleDeletion}
      />
    );

    const div = element.container.querySelector('#blogs');
    expect(div).toHaveTextContent('Type wars II Robert C. Martin', 'show');
    expect(div).not.toHaveTextContent('likes 20', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html');
  });
});

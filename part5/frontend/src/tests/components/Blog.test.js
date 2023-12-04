import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../../components/Blog';

test('renders content', () => {
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

  const handleLikes = (e) => {
    console.log('likes are handled successfully');
  };

  const handleDeletion = () => {
    console.log('Deletion is handled successfully');
  };

  render(<Blog blog={blog} handlelikes={handleLikes} handleDeletion={handleDeletion} />);

  const element = screen.getByText('Type wars II');
  expect(element).toBeDefined();
});

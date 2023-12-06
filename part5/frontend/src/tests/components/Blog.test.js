import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../components/Blog';

describe('rendering blogs', () => {
  let element, mockHandler, div;

  beforeEach(() => {
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

    mockHandler = jest.fn();

    element = render(
      <Blog
        blog={blog}
        handleLikes={mockHandler}
        handleDeletion={mockHandler}
      />
    );

    div = element.container.querySelector('#blogs');
  });

  test('renders blog title + author, only', () => {
    expect(div).toHaveTextContent('Type wars II Robert C. Martin', 'show');
    expect(div).not.toHaveTextContent(
      'likes 20',
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    );
  });

  test('clicking the show button works', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    expect(div).toHaveTextContent(
      'likes 20',
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    );
  });
});

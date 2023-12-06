import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlog from '../../components/AddBlog';

test('adding a new blog works', async () => {
  const user = userEvent.setup();

  // Mock Handlers
  const handleNewBlog = jest.fn();

  const { container } = render(<AddBlog handleNewBlog={handleNewBlog} />);

  const inputTitle = screen.getByPlaceholderText('Title here...');
  await user.type(inputTitle, 'World War II');

  const inputAuthor = screen.getByPlaceholderText('Author here...');
  await user.type(inputAuthor, 'Rober Json');

  const inputUrl = screen.getByPlaceholderText('URL here...');
  await user.type(inputUrl, 'http://hello.world/');

  const submitButton = screen.getByText('create');
  await user.click(submitButton);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  console.log(handleNewBlog.mock.calls);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  expect(handleNewBlog.mock.calls[0][0].title).toBe('World War II');
  expect(handleNewBlog.mock.calls[0][0].author).toBe('Rober Json');
  expect(handleNewBlog.mock.calls[0][0].url).toBe('http://hello.world/');
});

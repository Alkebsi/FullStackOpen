import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlog from '../../components/AddBlog';

test('adding a new blog works', async () => {
  const user = userEvent.setup();

  // Mock Handlers
  const handleNewBlog = jest.fn();
  const onTitleChange = jest.fn();
  const onAuthorChange = jest.fn();
  const onUrlChange = jest.fn();
  let title = 'World War II';
  let author = 'Johnson Drilla';
  let url = 'https://ww2.com/doc';

  const { container } = render(
    <AddBlog
      handleNewBlog={handleNewBlog}
      onTitleChange={onTitleChange}
      onAuthorChange={onAuthorChange}
      onUrlChange={onUrlChange}
      title={title}
      author={author}
      url={url}
    />
  );

  const input = screen.getByPlaceholderText('Title here...');
  await user.type(input, 'World War II');
  const submitButton = screen.getByText('create');
  await user.click(submitButton);

  expect(handleNewBlog.mock.calls).toHaveLength(1);
  console.log(handleNewBlog.mock.calls.target);
  // expect(handleNewBlog.mock.calls[0][0].content).toBe('World War II');
});

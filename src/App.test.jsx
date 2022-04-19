import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders title link', async () => {
  await act(async () => {
    const root = createRoot(container);
    root.render(<MemoryRouter><App /></MemoryRouter>);
  });

  const linkElement = container.querySelector('a');
  expect(linkElement.textContent.trim()).toBe('Okta-React Sample Project');
});

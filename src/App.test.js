import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders weekly update', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Weekly Update/i);
  expect(linkElement).toBeInTheDocument();
});

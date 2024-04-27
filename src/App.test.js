import { render } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const title = 'Comments App';
  const { getByText } = render(<App title={title} />);

  const titleElement = getByText(title);
  expect(titleElement.tagName).toBe('H1');
});

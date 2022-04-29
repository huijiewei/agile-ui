import { testA11y } from '@agile-ui/test-utils';
import { render } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';

test('should render correctly', async () => {
  const { getByText } = render(<VisuallyHidden>Click me</VisuallyHidden>);

  expect(getByText(/Click me/i)).toBeInTheDocument();
});

test('should have no accessibility violations', async () => {
  await testA11y(
    <button>
      <VisuallyHidden>Click Me</VisuallyHidden>
      <span>Submit</span>
    </button>
  );
});

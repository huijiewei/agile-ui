import { render } from '@testing-library/react';
import { Button } from './Button';
import { testA11y } from '@agile-ui/test-utils';

test('renders the Button component', () => {
  render(<Button>Hello world</Button>);
});

it('passes a11y test-utils', async () => {
  await testA11y(<Button>Hello world</Button>);
});

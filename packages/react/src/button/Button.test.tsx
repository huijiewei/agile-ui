import { Button } from './Button';
import { testA11y, testRender, screen } from '@agile-ui/test-utils';

test('renders the Button component', () => {
  testRender(<Button>Hello world</Button>);
});

test('sets disabled attribute based on prop', () => {
  testRender(<Button disabled />);
  expect(screen.getByRole('button')).toBeDisabled();
});

test('passes a11y test-utils', async () => {
  await testA11y(<Button>Hello world</Button>);
});

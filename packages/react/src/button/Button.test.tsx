import { screen, testA11y, testRender } from '@agile-ui/test-utils';
import { Button } from './Button';

describe('Button', () => {
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
});

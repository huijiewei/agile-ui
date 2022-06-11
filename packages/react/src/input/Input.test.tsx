import { Input } from './Input';
import { testA11y, testRender } from '@agile-ui/test-utils';

test('renders the Button component', () => {
  testRender(<Input />);
});

test('passes a11y test-utils', async () => {
  await testA11y(<Input />);
});

import { screen, testA11y, testRender } from '@agile-ui/test-utils';
import { Input } from './Input';

describe('Input', () => {
  test('renders the Input component', () => {
    testRender(<Input />);
  });

  test('passes a11y test', async () => {
    await testA11y(<Input />, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  test('Invalid input renders correctly', () => {
    testRender(<Input invalid />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('Disabled input renders correctly', () => {
    testRender(<Input disabled />);

    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
  });

  test('Readonly input renders correctly', () => {
    testRender(<Input readOnly />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-readonly', 'true');
  });
});

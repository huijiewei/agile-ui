import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { act, mocks, testA11y, testRender } from '@agile-ui/test-utils';
import { Avatar } from './Avatar';
import { AvatarBadge } from './AvatarBadge';

describe('Avatar', () => {
  test('passes a11y test', async () => {
    await testA11y(<Avatar />, {
      axeOptions: {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      },
    });
  });

  test('passes a11y test with AvatarBadge', async () => {
    await testA11y(
      <Avatar>
        <AvatarBadge />
      </Avatar>,
      {
        axeOptions: {
          rules: {
            'svg-img-alt': { enabled: false },
          },
        },
      }
    );
  });

  describe('fallback + loading strategy', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      mocks.image().restore();
    });

    test('renders an image', async () => {
      const mock = mocks.image();
      mock.simulate('loaded');

      const { getByAltText } = testRender(
        <Avatar
          src="https://yuncars-other.oss-cn-shanghai.aliyuncs.com/boilerplate/avatar/a00430.png@!avatar"
          name="卢文博"
        />
      );

      act(() => {
        vi.runAllTimers();
      });

      expect(getByAltText('卢文博')).toBeInTheDocument();
    });

    test('fires onError if image fails to load', async () => {
      const mock = mocks.image();
      mock.simulate('error');

      const src = 'https://www.huijiewei.com/images/203.jpg';
      const name = '宋展鹏';
      const onError = vi.fn();
      testRender(<Avatar src={src} name={name} onError={onError} />);

      act(() => {
        vi.runAllTimers();
      });

      expect(onError).toHaveBeenCalledTimes(1);
    });

    test('renders a name avatar if no src', () => {
      const { queryByText } = testRender(<Avatar name="冯凯瑞" />);
      expect(queryByText('冯')).toBeInTheDocument();
    });

    test('renders a default avatar if no name or src', () => {
      const { getByRole } = testRender(<Avatar />);
      expect(getByRole('img').tagName).eq('svg');
    });
  });
});

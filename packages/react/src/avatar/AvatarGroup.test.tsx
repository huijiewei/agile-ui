import { describe, expect, test } from 'vitest';
import { testA11y, testRender, screen } from '@agile-ui/test-utils';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

describe('AvatarGroup', () => {
  test('passes a11y test', async () => {
    await testA11y(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
      {
        axeOptions: {
          rules: {
            'svg-img-alt': { enabled: false },
          },
        },
      }
    );
  });

  test('renders a number avatar showing count of truncated avatars', () => {
    testRender(
      <AvatarGroup limit={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
    const moreLabel = screen.getByText('+3');
    expect(moreLabel).toBeInTheDocument();
  });

  test('does not render a number avatar showing count of truncated avatars if max is equal to avatars given', async () => {
    const tools = testRender(
      <AvatarGroup limit={4}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
    const moreLabel = tools.container.querySelector('span.shrink-0');
    expect(moreLabel).not.toBeInTheDocument();
  });

  test('does not render a number avatar showing count of truncated avatars if max is more than avatars given', async () => {
    const tools = testRender(
      <AvatarGroup limit={6}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
    const moreLabel = tools.container.querySelector('span.shrink-0');
    expect(moreLabel).not.toBeInTheDocument();
  });
});

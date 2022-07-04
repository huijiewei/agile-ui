import { testRenderHook } from '@agile-ui/test-utils';
import { useEventListener } from './index';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('useEventListener', () => {
  test('should be defined', () => {
    expect(useEventListener).toBeDefined();
  });

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('test on click listener', async () => {
    let state = 0;

    const onClick = () => {
      state++;
    };

    const { rerender, unmount } = testRenderHook(() => useEventListener('click', onClick, { target: container }));

    document.body.click();
    expect(state).toEqual(0);
    rerender();
    container.click();
    expect(state).toEqual(1);
    unmount();
    document.body.click();
    expect(state).toEqual(1);
  });
});

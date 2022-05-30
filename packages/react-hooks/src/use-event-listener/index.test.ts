import { renderHook } from '@testing-library/react';
import { useEventListener } from './index';

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

    const { rerender, unmount } = renderHook(() => useEventListener('click', onClick, { target: container }));

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

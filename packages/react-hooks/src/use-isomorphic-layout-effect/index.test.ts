import { testRenderHook } from '@agile-ui/test-utils';
import { useIsomorphicLayoutEffect } from './index';

describe('useIsomorphicLayoutEffect', () => {
  test('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  const callback = jest.fn();
  const { result } = testRenderHook(() => useIsomorphicLayoutEffect(callback));

  test('check return value', () => {
    expect(result.current).toBeUndefined();
  });
});

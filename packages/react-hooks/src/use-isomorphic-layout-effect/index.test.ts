import { useIsomorphicLayoutEffect } from './index';
import { renderHook } from '@testing-library/react';

describe('useIsomorphicLayoutEffect', () => {
  test('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  const callback = jest.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  test('check return value', () => {
    expect(result.current).toBeUndefined();
  });
});

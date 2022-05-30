import { renderHook } from '@testing-library/react';
import { useTimeout } from './index';

describe('useTimeout', () => {
  jest.useFakeTimers();

  test('should be defined', () => {
    expect(useTimeout).toBeDefined();
  });

  test('should call the callback after 10 seconds', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, 600));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not do anything if "delay" is null', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, null));

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

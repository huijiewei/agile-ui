import { testRenderHook, act } from '@agile-ui/test-utils';
import { useLocalStorage } from './index';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('initial state is in the returned state', () => {
    const { result } = testRenderHook(() => useLocalStorage('key', 'value'));

    expect(result.current[0]).toBe('value');
  });

  test('Initial state is a callback function', () => {
    const { result } = testRenderHook(() => useLocalStorage('key', () => 'value'));

    expect(result.current[0]).toBe('value');
  });

  test('Initial state is an array', () => {
    const { result } = testRenderHook(() => useLocalStorage('digits', [1, 2]));

    expect(result.current[0]).toEqual([1, 2]);
  });

  test('Update the state', () => {
    const { result } = testRenderHook(() => useLocalStorage('key', 'value'));

    act(() => {
      const setState = result.current[1];
      setState('edited');
    });

    expect(result.current[0]).toBe('edited');
  });

  test('Update the state writes localStorage', () => {
    const { result } = testRenderHook(() => useLocalStorage('key', 'value'));

    act(() => {
      const setState = result.current[1];
      setState('edited');
    });

    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('edited'));
  });

  test('Update the state with undefined', () => {
    const { result } = testRenderHook(() => useLocalStorage<string | undefined>('key', 'value'));

    act(() => {
      const setState = result.current[1];
      setState(undefined);
    });

    expect(result.current[0]).toBeUndefined();
  });

  test('Update the state with a callback function', () => {
    const { result } = testRenderHook(() => useLocalStorage('count', 2));

    act(() => {
      const setState = result.current[1];
      setState((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(3);
    expect(window.localStorage.getItem('count')).toEqual('3');
  });
});

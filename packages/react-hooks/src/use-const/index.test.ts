import { act, testRenderHook } from '@agile-ui/test-utils';
import { describe, expect, test } from 'vitest';
import { useConst } from './index';

type FooType = { foo: string };

describe('useConst', () => {
  test('should be defined', () => {
    expect(useConst).toBeDefined();
  });

  test('should return constant value for constant initialization', () => {
    const obj: FooType = { foo: 'bar' };
    const { rerender, result } = testRenderHook(() => useConst<FooType>(obj));
    expect(result.current).toBe(obj);
    act(() => rerender());
    expect(result.current).toBe(obj);
  });

  test('should return constant value even if props change', () => {
    const obj: FooType = { foo: 'bar' };
    const obj2: FooType = { foo: 'baz' };
    const { rerender, result } = testRenderHook(({ p }) => useConst<FooType>(p), {
      initialProps: { p: obj },
    });
    expect(result.current).toBe(obj);
    act(() => rerender({ p: obj2 }));
    expect(result.current).toBe(obj);
  });

  test('should return constant value from init function', () => {
    const { rerender, result } = testRenderHook(() => useConst<FooType>(() => ({ foo: 'bar' })));
    const obj: FooType = result.current;
    act(() => rerender());
    expect(result.current).toBe(obj);
  });
});

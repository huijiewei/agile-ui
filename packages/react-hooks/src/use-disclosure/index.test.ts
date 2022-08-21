import { act, testRenderHook } from '@agile-ui/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { useDisclosure } from './index';

describe('useDisclosure', () => {
  test('handles close correctly', () => {
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: true }));
    expect(result.current.open).toBe(true);

    act(() => result.current.handleClose());
    expect(result.current.open).toBe(false);
  });

  test('handles open correctly', () => {
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: false }));
    expect(result.current.open).toBe(false);

    act(() => result.current.handleOpen());
    expect(result.current.open).toBe(true);
  });

  test('handles toggle correctly', () => {
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: false }));
    expect(result.current.open).toBe(false);

    act(() => result.current.handleToggle());
    expect(result.current.open).toBe(true);

    act(() => result.current.handleToggle());
    expect(result.current.open).toBe(false);
  });

  test('calls onClose when close is called', () => {
    const onClose = vi.fn();
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: true, onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);

    act(() => result.current.handleClose());
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => result.current.handleClose());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onOpen when open is called', () => {
    const onOpen = vi.fn();
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: false, onOpen }));
    expect(onOpen).toHaveBeenCalledTimes(0);

    act(() => result.current.handleOpen());
    expect(onOpen).toHaveBeenCalledTimes(1);

    act(() => result.current.handleOpen());
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('calls onOpen and onClose correctly when toggle is called', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { result } = testRenderHook(() => useDisclosure({ defaultOpened: false, onOpen, onClose }));
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);

    act(() => result.current.handleToggle());
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(0);

    act(() => result.current.handleToggle());
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => result.current.handleToggle());
    expect(onOpen).toHaveBeenCalledTimes(2);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

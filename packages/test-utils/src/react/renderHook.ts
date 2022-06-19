import { renderHook, RenderHookOptions } from '@testing-library/react';

export const testRenderHook = <Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>
) => {
  return renderHook<Result, Props>(render, options);
};

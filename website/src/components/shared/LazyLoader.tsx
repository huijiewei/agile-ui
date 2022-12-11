import { Spinner } from '@agile-ui/react';
import type { HTMLProps } from 'react';
import { cx } from '@twind/core';

export const LazyLoader = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cx('flex h-32 w-full items-center justify-center text-lg text-gray-500 transition-opacity', className)}
      {...rest}
    >
      <Spinner color={'gray'} className={'mr-2'} />
      正在加载...
    </div>
  );
};

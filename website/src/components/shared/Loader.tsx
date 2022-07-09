import { Spinner } from '@agile-ui/react';
import type { HTMLProps } from 'react';
import { cx } from 'twind';

export const Loader = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cx('justify-center text-lg transition-opacity text-gray-500 flex h-32 items-center w-full', className)}
      {...rest}
    >
      <Spinner className={'mr-2'} />
      正在加载...
    </div>
  );
};

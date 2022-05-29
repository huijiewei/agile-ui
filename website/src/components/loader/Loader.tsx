import { Spinner } from '@agile-ui/react';
import type { HTMLProps } from 'react';
import { tx } from 'twind';

export const Loader = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      className={tx(
        'justify-center text-lg transition-opacity text-slate-600 flex h-32 items-center w-full',
        className
      )}
      {...rest}
    >
      <Spinner className={'mr-2'} color={'slate-600'} />
      正在加载...
    </div>
  );
};

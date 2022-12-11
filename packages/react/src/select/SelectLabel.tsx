import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';
import { useSelect } from './SelectProvider';

export const SelectLabel = (props: PrimitiveComponentProps) => {
  const { children, className, ...rest } = props;

  const { sizeClass } = useSelect();

  return (
    <div
      className={cx('flex  w-full items-center leading-none text-gray-400 outline-none', sizeClass, className)}
      {...rest}
    >
      <span className={'text-[93%]'}>{children}</span>
    </div>
  );
};

SelectLabel.displayName = 'SelectLabel';

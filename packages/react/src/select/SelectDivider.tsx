import type { PrimitiveComponentProps } from '../utils/component';
import { cx } from '@twind/core';

export const SelectDivider = (props: PrimitiveComponentProps) => {
  const { className, ...rest } = props;

  return <div className={cx('h-px m-1 bg-gray-200', className)} role={'separator'} {...rest} />;
};

SelectDivider.displayName = 'SelectDivider';

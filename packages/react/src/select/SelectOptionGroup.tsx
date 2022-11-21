import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';

export const SelectOptionGroup = (props: PrimitiveComponentProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cx('', className)} {...rest}>
      {children}
    </div>
  );
};

SelectOptionGroup.displayName = 'SelectOptionGroup';

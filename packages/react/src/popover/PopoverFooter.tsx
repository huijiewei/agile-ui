import { cx } from '@twind/core';
import type { PrimitiveComponentProps } from '../utils/component';

export const PopoverFooter = (props: PrimitiveComponentProps<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={cx('px-3 py-2 border-t border-t-gray-200', className)} {...rest}>
      {children}
    </footer>
  );
};

PopoverFooter.displayName = 'PopoverFooter';

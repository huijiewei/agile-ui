import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const PopoverFooter = (props: PrimitiveComponentProps<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={cx('px-3 py-2 border-t border-t-gray-200', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  PopoverFooter.displayName = 'PopoverFooter';
}

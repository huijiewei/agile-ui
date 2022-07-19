import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { FloatingArrow } from '../floating/FloatingArrow';
import type { PrimitiveComponentProps } from '../utils/component';
import { useDropdownMenu } from './DropdownMenuProvider';

export const DropdownMenuArrow = (props: PrimitiveComponentProps<'span'>) => {
  const { className, ...rest } = props;

  const { placement } = useDropdownMenu();

  return (
    <FloatingArrow
      placement={placement}
      className={cx('border-gray-200 bg-white dark:bg-gray-700', className)}
      {...rest}
    />
  );
};

if (__DEV__) {
  DropdownMenuArrow.displayName = 'DropdownMenuArrow';
}

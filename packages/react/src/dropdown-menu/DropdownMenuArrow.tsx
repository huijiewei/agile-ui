import { cx } from 'twind';
import { FloatingArrow } from '../floating/FloatingArrow';
import type { PrimitiveComponentProps } from '../utils/component';
import { useDropdownMenuPlacement } from './DropdownMenuProvider';

export const DropdownMenuArrow = (props: PrimitiveComponentProps<'span'>) => {
  const { className, ...rest } = props;

  const placement = useDropdownMenuPlacement();

  return (
    <FloatingArrow
      placement={placement}
      className={cx('border-gray-200 bg-white dark:bg-gray-700', className)}
      {...rest}
    />
  );
};

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

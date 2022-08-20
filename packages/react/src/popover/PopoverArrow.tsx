import { cx } from 'twind';
import { FloatingArrow } from '../floating/FloatingArrow';
import type { PrimitiveComponentProps } from '../utils/component';
import { usePopoverPlacement } from './PopoverProvider';

export const PopoverArrow = (props: PrimitiveComponentProps<'span'>) => {
  const { className, ...rest } = props;

  const placement = usePopoverPlacement();

  return (
    <FloatingArrow
      placement={placement}
      className={cx('border-gray-200 bg-white dark:bg-gray-700', className)}
      {...rest}
    />
  );
};

PopoverArrow.displayName = 'PopoverArrow';

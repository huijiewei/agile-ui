import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { FloatingArrow } from '../floating/FloatingArrow';
import type { PrimitiveComponentProps } from '../utils/component';
import { usePopover } from './PopoverProvider';

export const PopoverArrow = (props: PrimitiveComponentProps<'span'>) => {
  const { className, ...rest } = props;

  const { placement } = usePopover();

  return (
    <FloatingArrow
      placement={placement}
      className={cx('border-gray-200 bg-white dark:bg-gray-700', className)}
      {...rest}
    />
  );
};

if (__DEV__) {
  PopoverArrow.displayName = 'PopoverArrow';
}

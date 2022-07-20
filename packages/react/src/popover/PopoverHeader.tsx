import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { usePopover } from './PopoverProvider';

export const PopoverHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = usePopover();

  return (
    <header id={labelId} ref={ref} className={cx('px-3 py-2 border-b border-b-gray-200', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}

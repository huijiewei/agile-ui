import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { usePopoverAria } from './PopoverProvider';

export const PopoverHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = usePopoverAria();

  return (
    <header id={labelId} ref={ref} className={cx('px-3 py-2 border-b border-b-gray-200', className)} {...rest}>
      {children}
    </header>
  );
});

PopoverHeader.displayName = 'PopoverHeader';

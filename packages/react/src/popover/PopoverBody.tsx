import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { usePopoverAria } from './PopoverProvider';

export const PopoverBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { descriptionId } = usePopoverAria();

  return (
    <div id={descriptionId} ref={ref} className={cx('px-3 py-2', className)} {...rest}>
      {children}
    </div>
  );
});

PopoverBody.displayName = 'PopoverBody';

import { cx } from '@twind/core';
import { CloseButton } from '../close-button/CloseButton';
import { primitiveComponent } from '../utils/component';
import { usePopoverDispatch } from './PopoverProvider';

export const PopoverCloseButton = primitiveComponent<'button'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { handleClose } = usePopoverDispatch();

  return (
    <CloseButton
      onClick={handleClose}
      ref={ref}
      className={cx('absolute top-1 right-1 rounded p-0.5 text-lg hover:bg-gray-200', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

PopoverCloseButton.displayName = 'PopoverCloseButton';

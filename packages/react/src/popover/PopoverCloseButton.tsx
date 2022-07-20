import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
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
      className={cx('top-1 right-1 p-0.5 rounded hover:bg-gray-200', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

if (__DEV__) {
  PopoverCloseButton.displayName = 'PopoverCloseButton';
}

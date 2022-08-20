import { cx } from 'twind';
import { CloseButton } from '../close-button/CloseButton';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalCloseButton = primitiveComponent<'button'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { onClose } = useModal();
  return (
    <CloseButton
      onClick={onClose}
      ref={ref}
      className={cx('absolute top-2 right-2 p-1 rounded hover:bg-gray-200 text-lg', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';

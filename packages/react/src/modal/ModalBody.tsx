import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { scrollBehavior } = useModal();

  return (
    <div
      ref={ref}
      className={cx(
        'flex-1 px-3 py-2',
        scrollBehavior == 'inside' && 'scrollbar-thin overflow-y-auto overscroll-contain',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

ModalBody.displayName = 'ModalBody';

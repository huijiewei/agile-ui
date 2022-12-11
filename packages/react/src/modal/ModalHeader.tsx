import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';

export const ModalHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <header ref={ref} className={cx('flex-0 p-3 text-lg font-bold', className)} {...rest}>
      {children}
    </header>
  );
});

ModalHeader.displayName = 'ModalHeader';

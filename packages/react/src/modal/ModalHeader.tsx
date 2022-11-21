import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';

export const ModalHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <header ref={ref} className={cx('p-3 font-bold text-lg flex-0', className)} {...rest}>
      {children}
    </header>
  );
});

ModalHeader.displayName = 'ModalHeader';

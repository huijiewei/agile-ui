import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export const ModalHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <header ref={ref} className={cx('p-3 font-bold text-lg', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}

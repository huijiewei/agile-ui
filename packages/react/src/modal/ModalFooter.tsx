import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const ModalFooter = (props: PrimitiveComponentProps<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={cx('p-3', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}

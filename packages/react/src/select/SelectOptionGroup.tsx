import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const SelectOptionGroup = (props: PrimitiveComponentProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cx('', className)} {...rest}>
      {children}
    </div>
  );
};

if (__DEV__) {
  SelectOptionGroup.displayName = 'SelectOptionGroup';
}

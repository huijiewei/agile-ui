import { __DEV__ } from '@agile-ui/utils';
import type { PrimitiveComponentProps } from '../utils/component';
import { cx } from 'twind';

export const SelectDivider = (props: PrimitiveComponentProps) => {
  const { className, ...rest } = props;

  return <div className={cx('h-px m-1 bg-gray-200', className)} role={'separator'} {...rest} />;
};

if (__DEV__) {
  SelectDivider.displayName = 'SelectDivider';
}

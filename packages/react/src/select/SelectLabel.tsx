import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const SelectLabel = (props: PrimitiveComponentProps) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cx(
        'w-full text-[93%] text-gray-400 outline-none flex items-center px-3 py-1.5 leading-none',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

if (__DEV__) {
  SelectLabel.displayName = 'SelectLabel';
}

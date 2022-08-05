import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';
import { useSelect } from './SelectProvider';

export const SelectLabel = (props: PrimitiveComponentProps) => {
  const { children, className, ...rest } = props;

  const { sizeClass } = useSelect();

  return (
    <div
      className={cx('w-full  text-gray-400 outline-none flex items-center leading-none', sizeClass, className)}
      {...rest}
    >
      <span className={'text-[93%]'}>{children}</span>
    </div>
  );
};

if (__DEV__) {
  SelectLabel.displayName = 'SelectLabel';
}

import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';

export type InputBaseProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;
};

export type InputGroupProps = InputBaseProps;

export const InputGroup = primitiveComponent<'div', InputGroupProps>((props, ref) => {
  const { className, size = 'md', children, ...rest } = props;

  return (
    <div ref={ref} className={cx('group w-full relative flex', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}

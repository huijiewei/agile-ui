import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Color, Size } from '../utils/types';

export type CheckboxProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 颜色
   * @default 'blue'
   */
  color?: Color;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export const Checkbox = primitiveComponent<'input', CheckboxProps>((props, ref) => {
  const { className, size, children, ...rest } = props;

  return (
    <label className={tx('', className)}>
      <input ref={ref} className={tx('')} type="checkbox" {...rest} />
      <span>{children}</span>
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

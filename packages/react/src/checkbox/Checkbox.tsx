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

  /**
   * 不定状态
   * @default false
   */
  indeterminate?: boolean;
};

export const Checkbox = primitiveComponent<'input', CheckboxProps>((props, ref) => {
  const { className, size, checked, defaultChecked, value, disabled = false, indeterminate, children, ...rest } = props;

  return (
    <label className={tx('relative inline-flex items-center gap-1', disabled && 'cursor-not-allowed', className)}>
      <input disabled={disabled} ref={ref} className={tx('')} type="checkbox" {...rest} />
      <span className={tx(disabled && 'opacity-40')}>{children}</span>
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { InputBaseProps } from './InputGroup';

export type InputProps = InputBaseProps & {
  /**
   * 是否可以清除内容
   * @default false
   */
  clearable?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 是否未通过验证
   * @default false
   */
  invalid?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;
};

const inputSizes = {
  xs: 'h-6 leading-6 px-2 text-sm',
  sm: 'h-7 leading-7 px-2',
  md: 'h-8 leading-8 px-3',
  lg: 'h-9 leading-9 px-3',
  xl: 'h-10 leading-10 px-3 text-lg',
};

/**
 * 输入框
 */
export const Input = primitiveComponent<'input', InputProps>((props, ref) => {
  const {
    size = 'md',
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    ...rest
  } = props;
  return (
    <input
      className={cx(
        'border border-gray-200 bg-white relative rounded outline-none appearance-none text-left transition-colors resize-none',
        fullWidth ? 'w-full' : 'w-auto',
        inputSizes[size],
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 focus:border-blue-500',
        className
      )}
      aria-invalid={invalid}
      aria-readonly={readOnly}
      aria-required={required}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      {...rest}
      ref={ref}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

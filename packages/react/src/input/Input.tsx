import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';

export type InputProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

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
        'border border-gray-300 rounded outline-none appearance-none resize-none text-left leading-none',
        'bg-white',
        'focus:border-blue-500',
        'transition-[border-color]',
        fullWidth ? 'w-full' : '',
        inputSizes[size],
        disabled && 'opacity-60 cursor-not-allowed',
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

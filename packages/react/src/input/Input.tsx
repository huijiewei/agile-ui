import { __DEV__ } from '@agile-ui/utils';
import { useState } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { InputBaseProps } from './InputGroup';
import { inputSizes } from './inputSizes';

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
    clearable = false,
    className,
    onFocus,
    onBlur,
    value,
    defaultValue,
    ...rest
  } = props;

  const [force, setForce] = useState<boolean>(false);

  return (
    <div
      className={cx(
        'inline-flex items-center border bg-white relative rounded transition-colors',
        disabled ? 'opacity-50 cursor-not-allowed' : !force && 'hover:(border-gray-300 z-[2])',
        force ? !disabled && 'border-blue-500 z-[1]' : 'border-gray-200 ',
        fullWidth && 'w-full',
        inputSizes[size],
        className
      )}
    >
      <input
        className={
          'outline-none min-w-0 bg-transparent w-full disabled:cursor-not-allowed appearance-none text-left resize-none p-0 border-none'
        }
        aria-invalid={invalid}
        aria-readonly={readOnly}
        aria-required={required}
        aria-disabled={disabled}
        aria-multiline={'false'}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={(e) => {
          setForce(false);
          onBlur && onBlur(e);
        }}
        onFocus={(e) => {
          setForce(true);
          onFocus && onFocus(e);
        }}
        value={value}
        defaultValue={defaultValue}
        {...rest}
        ref={ref}
      />
      {clearable && value && <span className={''}></span>}
    </div>
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

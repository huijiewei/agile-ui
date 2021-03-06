import { mergeRefs, useControllableProp } from '@agile-ui/react-hooks';
import { __DEV__, StringOrNumber } from '@agile-ui/utils';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { cx } from 'twind';
import { CloseButton } from '../close-button/CloseButton';
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

  /**
   * 输入框值改变时触发回调
   */
  onChange?: (value: StringOrNumber, event?: ChangeEvent<HTMLInputElement>) => void;
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
    defaultValue = '',
    onChange,
    ...rest
  } = props;

  const [force, setForce] = useState<boolean>(false);
  const [valueState, setValueState] = useState(defaultValue);

  const [isControlled, controlledValue] = useControllableProp(value, valueState);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        setValueState(event.target.value);
      }

      onChange?.(event.target.value, event);
    },
    [disabled, isControlled, onChange, readOnly]
  );

  const handleClear = () => {
    setValueState('');
    onChange?.('');
  };

  const showClearButton = clearable && controlledValue;

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
        ref={mergeRefs(inputRef, ref)}
        className={cx(
          'outline-none min-w-0 bg-transparent disabled:cursor-not-allowed appearance-none text-left resize-none p-0 border-none',
          showClearButton ? 'w-[calc(100%-1em)]' : 'w-full'
        )}
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
        onChange={handleChange}
        value={controlledValue}
        {...rest}
      />
      {showClearButton && (
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
            inputRef.current?.focus();
          }}
          className={'absolute right-1 text-gray-500 rounded-full p-0.5 bg-gray-50 hover:bg-gray-100'}
        />
      )}
    </div>
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

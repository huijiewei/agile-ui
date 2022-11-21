import { useControllableProp, useFocus, useMergedRefs } from '@agile-ui/react-hooks';
import { ariaAttr } from '@agile-ui/utils';
import { ChangeEvent, KeyboardEvent, ReactNode, useCallback, useRef, useState } from 'react';
import { cx } from '@twind/core';
import { CloseButton } from '../close-button/CloseButton';
import { primitiveComponent } from '../utils/component';
import type { InputBaseProps } from './InputGroup';
import { inputSizes } from './inputSizes';

export type InputProps = InputBaseProps & {
  /**
   * 可控值
   */
  value?: string | number;

  /**
   * 非可控默认值
   */
  defaultValue?: string | number;

  /**
   * 前缀文字或者图标
   */
  prefix?: ReactNode;

  /**
   * 后缀文字或者图标
   */
  suffix?: ReactNode;

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
   * 值改变时触发回调
   */
  onChange?: (value: string | number) => void;

  /**
   * 点击清除按钮的回调
   */
  onClear?: () => void;

  /**
   * 按下回车键的回调
   */
  onPressEnter?: () => void;
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
    value,
    defaultValue,
    onChange,
    onClear,
    onPressEnter,
    prefix,
    suffix,
    ...rest
  } = props;

  const [valueState, setValueState] = useState(defaultValue || '');

  const [controlled, controlledValue] = useControllableProp(value, valueState);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      if (!controlled) {
        setValueState(event.target.value);
      }

      onChange?.(event.target.value);
    },
    [disabled, controlled, onChange, readOnly]
  );

  const handleClear = () => {
    setValueState('');
    onChange?.('');
    onClear?.();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (event.key == 'Enter') {
        onPressEnter && onPressEnter();
      }
    },
    [onPressEnter]
  );

  const showClearButton = clearable && controlledValue;

  const [focusRef, focus] = useFocus();

  const refs = useMergedRefs(inputRef, focusRef, ref);

  return (
    <div
      className={cx(
        'inline-flex h-fit items-center relative border bg-white rounded transition-colors',
        invalid && !focus && 'border-red-500',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && !invalid && !focus && 'hover:(border-gray-300 z-[2])',
        focus ? !disabled && 'border-blue-500 z-[1]' : 'border-gray-200 ',
        fullWidth && 'w-full',
        inputSizes(!!prefix, !!suffix)[size],
        className
      )}
    >
      {prefix && (
        <div className={cx('text-gray-500 whitespace-nowrap', size == 'xs' || size == 'sm' ? 'mr-1' : 'mr-2')}>
          {prefix}
        </div>
      )}
      <div className={'inline-flex relative grow items-center'}>
        <input
          ref={refs}
          className={cx(
            'outline-none bg-transparent disabled:cursor-not-allowed appearance-none text-left resize-none p-0 border-none',
            showClearButton ? 'w-[calc(100%-1em)]' : 'w-full'
          )}
          aria-invalid={ariaAttr(invalid)}
          aria-readonly={ariaAttr(readOnly)}
          aria-required={ariaAttr(required)}
          aria-disabled={ariaAttr(disabled)}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={controlledValue}
          {...rest}
        />
        {showClearButton && (
          <CloseButton
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
              inputRef.current?.focus();
            }}
            className={cx(
              'absolute text-gray-500 rounded-full p-px bg-gray-50 hover:bg-gray-100',
              size == 'xs' || size == 'sm' ? '-right-1' : '-right-1.5'
            )}
          />
        )}
      </div>
      {suffix && (
        <div className={cx('text-gray-500 whitespace-nowrap', size == 'xs' || size == 'sm' ? 'ml-1' : 'ml-2')}>
          {suffix}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

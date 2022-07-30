import { primitiveComponent } from '../utils/component';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';
import type { InputBaseProps } from './InputGroup';
import { mergeRefs, useControllableProp, useEventListener, useFocus } from '@agile-ui/react-hooks';
import { __DEV__, ariaAttr } from '@agile-ui/utils';
import { cx } from 'twind';
import { inputSizes } from './inputSizes';

export type NumberInputProps = InputBaseProps & {
  /**
   * 当前值
   */
  value?: number;

  /**
   * 默认值
   */
  defaultValue?: number;

  /**
   * 计数器步长
   * @default 1
   */
  step?: number;

  /**
   * 最小值
   * @default -Infinity
   */
  min?: number;

  /**
   * 最大值
   * @default Infinity
   */
  max?: number;

  /**
   * 数字精度
   */
  precision?: number;

  /**
   * 自定义显示格式
   */
  format?: (value: number) => string;

  /**
   * 如果使用自定义显示格式，转换为 parseFloat 可以处理的格式
   */
  parse?: (value: string) => string;

  /**
   * 是否根据鼠标滚轮改变
   * @default false
   */
  mouseWheel?: boolean;

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
  onChange?: (value: number) => void;
};

export const NumberInput = primitiveComponent<'input', NumberInputProps>((props, ref) => {
  const {
    size = 'md',
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    onFocus,
    onBlur,
    value,
    defaultValue,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    precision,
    mouseWheel = false,
    parse = (value) => value,
    format = (value) => (isNaN(value) ? '' : value.toString()),
    onChange,
    ...rest
  } = props;

  const [valueState, setValueState] = useState(defaultValue);
  const [isControlled, controlledValue] = useControllableProp(
    value ? parseFloat(parse(value.toString())) : undefined,
    valueState
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const { focus, handleBlur, handleFocus } = useFocus({ onBlur, onFocus });

  const update = useCallback(
    (next: number) => {
      if (next == controlledValue) {
        return;
      }

      if (!isControlled) {
        setValueState(next);
      }

      onChange?.(next);
    },
    [controlledValue, isControlled, onChange]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if ((event.nativeEvent as InputEvent).isComposing) {
        return;
      }

      console.log(event.target.value);

      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      update(parseFloat(parse(event.target.value)));
    },
    [disabled, parse, readOnly, update]
  );

  const increment = useCallback(
    (incrementStep = step) => {
      update((controlledValue || 0) + incrementStep);
    },
    [controlledValue, step, update]
  );

  const decrement = useCallback(
    (decrementStep = step) => {
      update((controlledValue || 0) - decrementStep);
    },
    [controlledValue, step, update]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (
        event.key != null &&
        event.key.length == 1 &&
        !(event.ctrlKey || event.altKey || event.metaKey) &&
        !/^[Ee0-9+\-.]$/.test(event.key)
      ) {
        event.preventDefault();
      }

      if (event.key == 'ArrowUp') {
        event.preventDefault();
        increment((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * step);
      }

      if (event.key == 'ArrowDown') {
        event.preventDefault();
        decrement((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * step);
      }

      if (event.key == 'Home') {
        event.preventDefault();
        update(min);
      }

      if (event.key == 'End') {
        event.preventDefault();
        update(max);
      }
    },
    [decrement, increment, max, min, step, update]
  );

  useEventListener(
    'wheel',
    (event) => {
      if (!mouseWheel || !focus) {
        return;
      }

      event.preventDefault();

      const direction = Math.sign(event.deltaY);

      if (direction === -1) {
        increment();
      } else if (direction === 1) {
        decrement();
      }
    },
    { target: inputRef.current, passive: false }
  );

  return (
    <div
      className={cx(
        'inline-flex items-center border bg-white relative rounded transition-colors',
        invalid && !focus && 'border-red-500',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && !invalid && !focus && 'hover:(border-gray-300 z-[2])',
        focus ? !disabled && 'border-blue-500 z-[1]' : 'border-gray-200 ',
        fullWidth && 'w-full',
        inputSizes[size],
        className
      )}
    >
      <input
        ref={mergeRefs(inputRef, ref)}
        className={
          'outline-none bg-transparent disabled:cursor-not-allowed appearance-none text-left resize-none p-0 border-none'
        }
        min={min}
        max={max}
        type={'text'}
        inputMode={'decimal'}
        aria-invalid={ariaAttr(invalid)}
        aria-readonly={ariaAttr(readOnly)}
        aria-required={ariaAttr(required)}
        aria-disabled={ariaAttr(disabled)}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={format(controlledValue ?? NaN)}
        {...rest}
      />
    </div>
  );
});

if (__DEV__) {
  NumberInput.displayName = 'NumberInput';
}

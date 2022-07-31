import { primitiveComponent } from '../utils/component';
import { ChangeEvent, KeyboardEvent, FocusEvent, useCallback, useRef, useState } from 'react';
import type { InputBaseProps } from './InputGroup';
import { mergeRefs, useControllableProp, useEventListener, useFocus } from '@agile-ui/react-hooks';
import { __DEV__, ariaAttr, clamp, isNumber } from '@agile-ui/utils';
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
  format?: (value: string) => string;

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
  onChange?: (value: number | undefined) => void;
};

const numberInputSize = {
  xs: { input: 'pr-4', control: 'w-4 text-[0.75em]' },
  sm: { input: 'pr-5', control: 'w-5 text-[0.875em]' },
  md: { input: 'pr-5', control: 'w-5' },
  lg: { input: 'pr-6', control: 'w-6' },
  xl: { input: 'pr-6', control: 'w-6' },
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
    min,
    max,
    precision,
    mouseWheel = false,
    parse = (value) => value,
    format = (value) => value,
    onChange,
    ...rest
  } = props;

  const minValue = isNumber(min) ? min : -Infinity;
  const maxValue = isNumber(max) ? max : Infinity;

  const [valueState, setValueState] = useState(defaultValue);
  const [isControlled, controlledValue] = useControllableProp(value, valueState);

  const [inputValue, setInputValue] = useState(controlledValue?.toFixed(precision) ?? '');

  const inputRef = useRef<HTMLInputElement>(null);

  const { focus, handleBlur, handleFocus } = useFocus({ onBlur, onFocus });

  const update = useCallback(
    (next: number | undefined) => {
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

      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      const value = event.target.value;
      const parsed = parse(value);

      setInputValue(parsed);

      if (value == '' || value == '-') {
        update(undefined);
      } else {
        const number = parseFloat(parsed);

        if (!Number.isNaN(number)) {
          update(number);
        }
      }
    },
    [disabled, parse, readOnly, update]
  );

  const increment = useCallback(
    (incrementStep = step) => {
      if (controlledValue == undefined) {
        update(min ?? 0);
        setInputValue(min?.toFixed(precision) ?? '0');
      } else {
        const value = clamp(controlledValue + incrementStep, [minValue, maxValue]).toFixed(precision);

        update(parseFloat(value));
        setInputValue(value);
      }
    },
    [controlledValue, maxValue, min, minValue, precision, step, update]
  );

  const decrement = useCallback(
    (decrementStep = step) => {
      if (controlledValue == undefined) {
        update(min ?? 0);
        setInputValue(min?.toFixed(precision) ?? '0');
      } else {
        const value = clamp(controlledValue - decrementStep, [minValue, maxValue]).toFixed(precision);

        update(parseFloat(value));
        setInputValue(value);
      }
    },
    [controlledValue, maxValue, min, minValue, precision, step, update]
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

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setInputValue('');
        update(undefined);
      } else {
        const parsed = parse(event.target.value[0] == '.' ? `0${event.target.value}` : event.target.value);
        const value = clamp(parseFloat(parsed), [minValue, maxValue]);

        if (!Number.isNaN(value)) {
          setInputValue(value.toFixed(precision));
          update(parseFloat(value.toFixed(precision)));
        } else {
          setInputValue(controlledValue?.toFixed(precision) ?? '');
        }
      }

      handleBlur(event);
    },
    [controlledValue, handleBlur, maxValue, minValue, parse, precision, update]
  );

  useEventListener(
    'wheel',
    (event) => {
      if (!mouseWheel || !focus) {
        return;
      }

      event.preventDefault();

      const direction = Math.sign(event.deltaY);

      if (direction == -1) {
        increment();
      } else if (direction == 1) {
        decrement();
      }
    },
    { target: inputRef.current, passive: false }
  );

  const formattedValue = format(inputValue);

  return (
    <div
      className={cx(
        'inline-flex pr-0 items-center border bg-white relative rounded transition-colors',
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
        className={cx(
          'outline-none bg-transparent disabled:cursor-not-allowed appearance-none text-left resize-none p-0 border-none',
          numberInputSize[size]['input']
        )}
        type={'text'}
        inputMode={'decimal'}
        role={'spinbutton'}
        aria-valuemin={min}
        aria-valuemax={max}
        autoComplete={'off'}
        autoCorrect={'off'}
        aria-invalid={ariaAttr(invalid)}
        aria-readonly={ariaAttr(readOnly)}
        aria-required={ariaAttr(required)}
        aria-disabled={ariaAttr(disabled)}
        aria-valuenow={controlledValue}
        aria-valuetext={formattedValue != '' ? formattedValue : undefined}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={handleInputBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={formattedValue}
        {...rest}
      />
      <div className={cx('absolute right-0 h-full flex flex-col', numberInputSize[size]['control'])}>
        <button
          tabIndex={-1}
          onClick={() => {
            increment();
          }}
          disabled={(controlledValue || 0) >= maxValue}
          className={
            'w-full select-none appearance-none disabled:(opacity-50 cursor-not-allowed bg-gray-50) rounded-tr flex flex-1 justify-center items-center bg-gray-50 hover:bg-gray-200'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          tabIndex={-1}
          onClick={() => {
            decrement();
          }}
          disabled={(controlledValue || 0) <= minValue}
          className={
            'w-full select-none appearance-none disabled:(opacity-50 cursor-not-allowed bg-gray-50) rounded-br flex flex-1 justify-center items-center bg-gray-50 hover:bg-gray-200'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

if (__DEV__) {
  NumberInput.displayName = 'NumberInput';
}

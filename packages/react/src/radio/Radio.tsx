import { mergeRefs, useCallbackRef, useControllableProp, useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { __DEV__, isNumber } from '@agile-ui/utils';
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useRadioGroup } from './RadioGroup';
import type { RadioBaseProps } from './RadioGroup';

export type RadioProps = RadioBaseProps & {
  /**
   * 值
   */
  value?: string | number;

  /**
   * 单选框和标签之间的距离
   * @default '2'
   */
  spacing?: string | number;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 选择状态发生更改时，将调用该回调。
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const radioSizeStyles = {
  xs: { control: 'h-3 w-3', label: 'text-xs', icon: 'text-[0.45rem]' },
  sm: { control: 'h-3.5 w-3.5', label: 'text-sm', icon: 'text-[0.5rem]' },
  md: { control: 'h-4 w-4', label: '', icon: 'text-[0.625rem]' },
  lg: { control: 'h-5 w-5', label: 'text-lg', icon: 'text-[0.75rem]' },
  xl: { control: 'h-6 w-6', label: 'text-xl', icon: 'text-[0.875rem]' },
};

export const Radio = primitiveComponent<'input', RadioProps>((props, ref) => {
  const group = useRadioGroup();

  const {
    name = group?.name,
    size = group?.size || 'md',
    color = group?.color || 'blue',
    disabled = group?.disabled || false,
    spacing = 2,
    className,
    children,

    value,
    checked,
    defaultChecked,
    onChange,
    readOnly,
    ...rest
  } = props;

  const onChangeRef = useCallbackRef((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    group?.onChange?.(event);
  });

  const [checkedState, setCheckedState] = useState(Boolean(defaultChecked));

  const [isControlled, controlledChecked] = useControllableProp(
    group?.value && value ? group.value == value : checked,
    checkedState
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        setCheckedState(event.target.checked);
      }

      onChangeRef?.(event);
    },
    [disabled, isControlled, onChangeRef, readOnly]
  );

  useIsomorphicLayoutEffect(() => {
    const el = inputRef.current;

    if (!el?.form) {
      return;
    }

    el.form.onreset = () => {
      setCheckedState(Boolean(defaultChecked));
    };
  }, []);

  const sizeStyle = radioSizeStyles[size];

  return (
    <label
      className={cx(
        'inline-flex items-center relative',
        isNumber(spacing) ? `gap-${spacing}` : `gap-[${spacing}]`,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <input
        ref={mergeRefs(inputRef, ref)}
        name={name}
        className={'sr-only'}
        value={value}
        type={'radio'}
        checked={controlledChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        {...rest}
      />
      <span
        className={cx(
          'inline-flex rounded-full items-center shrink-0 select-none justify-center border-1',
          controlledChecked
            ? `bg-${color}-500 border-${color}-500 text-white`
            : disabled
            ? 'bg-gray-100'
            : 'border-gray-300',
          disabled && 'opacity-40',
          sizeStyle.control,
          controlledChecked && `&:before:(inline-block w-1/2 h-1/2 rounded-[50%] bg-current relative content-[''])`
        )}
      />
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-40')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}

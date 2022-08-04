import {
  mergeRefs,
  useCallbackRef,
  useControllableProp,
  useFocus,
  useFocusVisible,
  useIsomorphicLayoutEffect,
} from '@agile-ui/react-hooks';
import { __DEV__, dataAttr, isNumber } from '@agile-ui/utils';
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
   * 选择状态发生更改时触发回调
   */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
};

const radioSizeStyles = {
  xs: { control: 'h-3 w-3', label: 'text-xs' },
  sm: { control: 'h-3.5 w-3.5', label: 'text-sm' },
  md: { control: 'h-4 w-4', label: '' },
  lg: { control: 'h-5 w-5', label: 'text-lg' },
  xl: { control: 'h-6 w-6', label: 'text-xl' },
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
    defaultChecked = false,
    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const onChangeRef = useCallbackRef((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked, e);
    group?.onChange?.(e);
  });

  const [checkedState, setCheckedState] = useState(defaultChecked);

  const [isControlled, controlledChecked] = useControllableProp(
    group?.value && value ? group.value == value : checked,
    checkedState
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setCheckedState(event.target.checked);
      }

      onChangeRef?.(event);
    },
    [isControlled, onChangeRef]
  );

  useIsomorphicLayoutEffect(() => {
    const el = inputRef.current;

    if (!el?.form) {
      return;
    }

    el.form.onreset = () => {
      setCheckedState(defaultChecked);
    };
  }, []);

  const sizeStyle = radioSizeStyles[size];

  const { focusVisible } = useFocusVisible();
  const { focus, handleBlur, handleFocus } = useFocus({ onBlur, onFocus });

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
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
      />
      <span
        data-focus-visible={dataAttr(focus && focusVisible)}
        className={cx(
          'inline-flex rounded-full items-center shrink-0 select-none justify-center border-2',
          `focus-visible:(ring ring-${color}-300)`,
          controlledChecked ? `bg-${color}-500 border-${color}-500 text-white` : 'border-gray-200 bg-white',
          disabled && 'opacity-50',
          sizeStyle.control,
          controlledChecked && `&:before:(inline-block w-1/2 h-1/2 rounded-[50%] bg-current relative content-[''])`
        )}
      />
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}

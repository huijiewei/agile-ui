import {
  useCallbackRef,
  useControllableProp,
  useFocus,
  useFocusVisible,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@agile-ui/react-hooks';
import { ariaAttr, dataAttr, isNumber } from '@agile-ui/utils';
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { useRadioGroup } from './RadioGroup';
import type { RadioBaseProps } from './RadioGroup';

export type RadioProps = RadioBaseProps & {
  /**
   * 值
   */
  value?: string | number;

  /**
   * 是否必选
   * @default false
   */
  required?: boolean;

  /**
   * 是否未通过验证
   * @default false
   */
  invalid?: boolean;

  /**
   * 单选框和标签之间的距离
   * @default '2'
   */
  spacing?: string | number;

  /**
   * 选择状态发生更改时触发回调
   */
  onChange?: (checked: boolean) => void;
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
    required = false,
    invalid = false,
    style,
    ...rest
  } = props;

  const onChangeRef = useCallbackRef((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
    group?.onChange?.(event);
  });

  const [checkedState, setCheckedState] = useState(defaultChecked);

  const [controlled, controlledChecked] = useControllableProp(
    group?.value && value ? group.value == value : checked,
    checkedState
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!controlled) {
        setCheckedState(event.target.checked);
      }

      onChangeRef?.(event);
    },
    [controlled, onChangeRef]
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
  const [focusRef, focus] = useFocus();

  const refs = useMergedRefs(inputRef, focusRef, ref);

  return (
    <label
      className={cx(
        'inline-flex items-center relative',
        isNumber(spacing) ? `gap-${spacing}` : `gap-[${spacing}]`,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      style={style}
    >
      <input
        ref={refs}
        name={name}
        className={'sr-only'}
        value={value}
        type={'radio'}
        checked={controlledChecked}
        disabled={disabled}
        aria-disabled={ariaAttr(disabled)}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      <span
        data-focus-visible={dataAttr(focus && focusVisible)}
        className={cx(
          'inline-flex rounded-full items-center shrink-0 select-none justify-center border-2',
          `focus-visible:(ring ring-${color}-300)`,
          invalid ? 'border-red-300' : controlledChecked ? `border-${color}-500` : 'border-gray-200',
          controlledChecked ? `bg-${color}-500 text-white` : 'bg-white',
          disabled && 'opacity-50',
          sizeStyle.control,
          controlledChecked && `&:before:(inline-block w-1/2 h-1/2 rounded-[50%] bg-current relative content-[''])`
        )}
      />
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';

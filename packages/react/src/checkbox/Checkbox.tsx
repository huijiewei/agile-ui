import {
  useCallbackRef,
  useControllableProp,
  useFocus,
  useFocusVisible,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@agile-ui/react-hooks';
import { ariaAttr, dataAttr, isNumber } from '@agile-ui/utils';
import type { ReactElement } from 'react';
import { ChangeEvent, cloneElement, useCallback, useRef, useState } from 'react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import { CheckboxBaseProps, useCheckboxGroup } from './CheckboxGroup';
import { CheckboxIcon } from './CheckboxIcon';

export type CheckboxProps = CheckboxBaseProps & {
  /**
   * 值
   */
  value?: string | number;

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
   * 复选框和标签之间的距离
   * @default '2'
   */
  spacing?: string | number;

  /**
   * 部分选中
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 复选框图标
   * @default CheckboxIcon
   * @type ReactElement
   */
  icon?: ReactElement;

  /**
   * 选择状态发生更改时触发回调
   */
  onChange?: (checked: boolean) => void;
};

const checkboxSizeStyles = {
  xs: { control: 'h-3 w-3', label: 'text-xs', icon: 'text-[0.45rem]' },
  sm: { control: 'h-3.5 w-3.5', label: 'text-sm', icon: 'text-[0.5rem]' },
  md: { control: 'h-4 w-4', label: '', icon: 'text-[0.625rem]' },
  lg: { control: 'h-5 w-5', label: 'text-lg', icon: 'text-[0.75rem]' },
  xl: { control: 'h-6 w-6', label: 'text-xl', icon: 'text-[0.875rem]' },
};

export const Checkbox = primitiveComponent<'input', CheckboxProps>((props, ref) => {
  const group = useCheckboxGroup();

  const {
    size = group?.size || 'md',
    color = group?.color || 'blue',
    disabled = group?.disabled || false,
    spacing = 2,
    className,
    children,
    icon = <CheckboxIcon />,

    value,
    checked,
    defaultChecked = false,
    indeterminate,
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

  const inputRef = useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = useState(defaultChecked);

  const [controlled, controlledChecked] = useControllableProp(
    group?.value && value ? group.value.includes(value) : checked,
    checkedState
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!controlled) {
        if (controlledChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(indeterminate ? true : event.target.checked);
        }
      }

      onChangeRef?.(event);
    },
    [indeterminate, controlledChecked, controlled, onChangeRef]
  );

  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  useIsomorphicLayoutEffect(() => {
    const el = inputRef.current;

    if (!el?.form) {
      return;
    }

    el.form.onreset = () => {
      setCheckedState(defaultChecked);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const notInSync = inputRef.current.checked !== controlledChecked;

    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);

  const sizeStyle = checkboxSizeStyles[size];

  const clonedIcon = cloneElement(icon, {
    indeterminate: indeterminate,
    className: cx(sizeStyle.icon, 'transition-opacity', controlledChecked || indeterminate ? 'opacity-1' : 'opacity-0'),
  });

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
        className={'sr-only'}
        value={value}
        type="checkbox"
        checked={controlledChecked}
        disabled={disabled}
        aria-disabled={ariaAttr(disabled)}
        required={required}
        aria-invalid={ariaAttr(invalid)}
        onChange={handleChange}
        {...rest}
      />
      <div
        data-focus-visible={dataAttr(focus && focusVisible)}
        className={cx(
          'shrink-0 select-none rounded inline-flex items-center transition-colors justify-center border-2',
          `focus-visible:(ring ring-${color}-300)`,
          invalid ? 'border-red-300' : controlledChecked || indeterminate ? `border-${color}-500` : 'border-gray-200',
          controlledChecked || indeterminate ? `bg-${color}-500 text-white` : 'bg-white',
          disabled && 'opacity-50',
          sizeStyle.control
        )}
      >
        {clonedIcon}
      </div>
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

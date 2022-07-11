import { mergeRefs, useCallbackRef, useControllableProp, useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import type { ReactElement } from 'react';
import { ChangeEvent, cloneElement, useCallback, useRef, useState } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { CheckboxBaseProps, useCheckboxGroup } from './CheckboxGroup';
import { CheckboxIcon } from './CheckboxIcon';

export type CheckboxProps = CheckboxBaseProps & {
  /**
   * 值
   */
  value?: string | number;

  /**
   * 复选框和标签之间的距离
   * @default '2'
   */
  spacing?: number;

  /**
   * 部分选中
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 复选框图标
   * @default CheckboxIcon
   */
  icon?: ReactElement;
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
    defaultChecked,
    indeterminate,
    onChange,
    readOnly,
    ...rest
  } = props;

  const onChangeRef = useCallbackRef((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    group?.onChange?.(event);
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = useState(Boolean(defaultChecked));

  const [isControlled, isChecked] = useControllableProp(
    group?.value && value ? group.value.includes(value) : checked,
    checkedState
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(indeterminate ? true : event.target.checked);
        }
      }

      onChangeRef?.(event);
    },
    [disabled, indeterminate, readOnly, isChecked, isControlled, onChangeRef]
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
      setCheckedState(Boolean(defaultChecked));
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const notInSync = inputRef.current.checked !== isChecked;

    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);

  const sizeStyle = checkboxSizeStyles[size];

  const clonedIcon = cloneElement(icon, {
    indeterminate: indeterminate,
    className: cx(sizeStyle.icon, 'transition-opacity', isChecked || indeterminate ? 'opacity-1' : 'opacity-0'),
  });

  return (
    <label
      className={cx(
        'inline-flex items-center align-top relative',
        `gap-${spacing}`,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <input
        ref={mergeRefs(inputRef, ref)}
        className={'sr-only'}
        value={value}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        {...rest}
      />
      <span
        className={cx(
          'shrink-0 select-none rounded inline-flex items-center transition-colors justify-center border-1',
          isChecked || indeterminate ? `bg-${color}-500 border-${color}-500 text-white` : 'border-inherit',
          disabled && 'opacity-40',
          sizeStyle.control
        )}
      >
        {clonedIcon}
      </span>
      <span className={cx(sizeStyle.label, disabled && 'opacity-40')}>{children}</span>
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

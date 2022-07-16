import { mergeRefs, useCallbackRef, useControllableProp, useIsomorphicLayoutEffect } from '@agile-ui/react-hooks';
import { __DEV__, dataAttr, isNumber } from '@agile-ui/utils';
import type { ReactElement } from 'react';
import { ChangeEvent, cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { trackFocusVisible } from '../utils/focus-visible';
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
  spacing?: string | number;

  /**
   * 部分选中
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 复选框图标
   * @default CheckboxIcon
   */
  icon?: ReactElement;

  /**
   * 选择状态发生更改时，将调用该回调。
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
    onFocus,
    onBlur,
    ...rest
  } = props;

  const onChangeRef = useCallbackRef((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    group?.onChange?.(event);
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = useState(Boolean(defaultChecked));

  const [isControlled, controlledChecked] = useControllableProp(
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
        if (controlledChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(indeterminate ? true : event.target.checked);
        }
      }

      onChangeRef?.(event);
    },
    [disabled, indeterminate, readOnly, controlledChecked, isControlled, onChangeRef]
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

  const [focusVisible, setFocusVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    return trackFocusVisible(setFocusVisible);
  }, []);

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
        className={'sr-only'}
        value={value}
        type="checkbox"
        checked={controlledChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={(e) => {
          setFocus(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          onBlur && onBlur(e);
        }}
        {...rest}
      />
      <div
        data-focus-visible={dataAttr(focus && focusVisible)}
        className={cx(
          'shrink-0 select-none rounded inline-flex items-center transition-colors justify-center border-2',
          `focus-visible:(ring ring-${color}-300)`,
          controlledChecked || indeterminate
            ? `bg-${color}-500 border-${color}-500 text-white`
            : 'border-gray-200 bg-white',
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

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

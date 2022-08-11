import {
  useControllableProp,
  useFocus,
  useFocusVisible,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@agile-ui/react-hooks';
import { __DEV__, dataAttr, isNumber } from '@agile-ui/utils';
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';

type SwitchProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 开关和标签之间的距离
   * @default '2'
   */
  spacing?: string | number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 开关状态发生更改时，将调用该回调。
   */
  onChange?: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void;
};

const switchSizeStyles = {
  xs: { track: 'h-3 w-5', thumb: 'translate-x-2', label: 'text-xs leading-3' },
  sm: { track: 'h-3.5 w-6', thumb: 'translate-x-2.5', label: 'text-sm' },
  md: { track: 'h-5 w-10', thumb: 'translate-x-5', label: '' },
  lg: { track: 'h-6 w-12', thumb: 'translate-x-6', label: 'text-lg' },
  xl: { track: 'h-7 w-14', thumb: 'translate-x-7', label: 'text-xl' },
};

export const Switch = primitiveComponent<'input', SwitchProps>((props, ref) => {
  const {
    color = 'blue',
    size = 'md',
    spacing = 2,
    disabled,
    readOnly,
    checked,
    defaultChecked = false,
    value,
    onChange,
    children,
    className,
    ...rest
  } = props;

  const [checkedState, setCheckedState] = useState(defaultChecked);

  const [controlled, controlledChecked] = useControllableProp(checked, checkedState);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      if (!controlled) {
        setCheckedState(event.target.checked);
      }

      onChange?.(event.target.checked, event);
    },
    [readOnly, disabled, controlled, onChange]
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

  const sizeStyle = switchSizeStyles[size];

  const { focusVisible } = useFocusVisible();
  const [focusRef, focus] = useFocus();

  const refs = useMergedRefs(inputRef, focusRef, ref);

  return (
    <label
      className={cx(
        'inline-flex items-center relative',
        isNumber(spacing) || spacing == 'px' ? `gap-${spacing}` : `gap-[${spacing}]`,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <input
        className={'sr-only'}
        value={value}
        type="checkbox"
        ref={refs}
        checked={controlledChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        {...rest}
      />
      <span
        data-focus-visible={dataAttr(focus && focusVisible)}
        className={cx(
          'inline-flex shrink-0 justify-start rounded-full p-[2px] transition-colors',
          `focus-visible:(ring ring-${color}-300)`,
          sizeStyle.track,
          controlledChecked ? `bg-${color}-500` : 'bg-gray-200',
          disabled && 'opacity-50'
        )}
      >
        <span
          className={cx(
            'bg-white rounded-[inherit] transition-transform h-full aspect-square',
            controlledChecked && sizeStyle.thumb
          )}
        />
      </span>
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}

import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { CheckboxBaseProps, useCheckboxGroup } from './CheckboxGroup';

export type CheckboxProps = CheckboxBaseProps & {
  /**
   * 值
   */
  value?: string | number;

  /**
   * 复选框和标签之间的距离
   * @default 2
   */
  spacing?: number;

  /**
   * 不定状态
   * @default false
   */
  indeterminate?: boolean;
};

const checkboxSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
};

const checkboxFontSizes = {
  xs: 'text-sm',
  sm: '',
  md: '',
  lg: 'text-lg',
  xl: 'text-lg',
};

export const Checkbox = primitiveComponent<'input', CheckboxProps>((props, ref) => {
  const group = useCheckboxGroup();

  const {
    size = group?.size || 'md',
    color = group?.color || 'blue',
    disabled = group?.disabled || false,
    spacing = 2,
    className,
    checked,
    defaultChecked,
    value,
    indeterminate,
    children,
    ...rest
  } = props;

  const sizeClass = checkboxSizes[size];

  const groupProps = group
    ? {
        checked: value && group.value ? group.value.includes(value) : undefined,
        onChange: group.onChange,
      }
    : {};

  return (
    <label className={cx('inline-flex items-center', `gap-${spacing}`, disabled && 'cursor-not-allowed', className)}>
      <span className={cx('relative flex items-center justify-center', sizeClass)}>
        <input
          ref={ref}
          disabled={disabled}
          className={cx(
            'appearance-none border rounded transition-colors duration-150',
            disabled
              ? `checked:(bg-slate-300) bg-slate-100 border-slate-400 `
              : `border-slate-400 bg-white dark:bg-black checked:(bg-${color}-600 border-${color}-600)`,
            sizeClass
          )}
          value={value}
          type="checkbox"
          checked={indeterminate || checked}
          {...rest}
          {...groupProps}
        />
        {indeterminate ? (
          <svg
            viewBox="0 0 24 24"
            className={cx(
              'absolute z-10 w-3/5 pointer-events-none',
              disabled ? 'text-slate-100' : 'text-white dark:text-black'
            )}
            stroke={'currentColor'}
            strokeWidth={4}
            opacity={1}
            transform={'none'}
          >
            <line x1="21" x2="3" y1="12" y2="12"></line>
          </svg>
        ) : (
          <svg
            viewBox="0 0 12 10"
            className={cx(
              'absolute z-10 w-3/5 pointer-events-none',
              disabled ? 'text-slate-100' : 'text-white dark:text-black'
            )}
            fill={'none'}
            strokeWidth={2}
            stroke={'currentColor'}
            strokeDasharray={16}
            opacity={1}
            strokeDashoffset={0}
          >
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        )}
      </span>
      <span className={cx('leading-none', checkboxFontSizes[size], disabled && 'opacity-40')}>{children}</span>
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

import { __DEV__ } from '@agile-ui/utils';
import { primitiveComponent } from '../utils/component';
import type { Color, Size } from '../utils/types';
import { cx } from 'twind';

export type ProgressProps = {
  /**
   * 颜色
   * @default 'blue'
   */
  color?: Color;

  value?: number;

  size?: Size;

  striped?: boolean;

  animate?: boolean;

  indeterminate?: boolean;

  label?: string;
};

export const ProgressBar = primitiveComponent<'div', ProgressProps>((props, ref) => {
  const {
    color = 'blue',
    value,
    size = 'md',
    striped = false,
    animate = false,
    indeterminate = false,
    label,
    className,
    children,
    ...rest
  } = props;

  return (
    <div className="relative bg-gray-100 overflow-hidden h-2 rounded">
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
        {...rest}
        className={cx(
          'rounded h-full',
          color == 'white' || color == 'black' ? `bg-${color}` : `bg-${color}-500`,
          className
        )}
        style={{ width: `${value}%` }}
      >
        {children}
      </div>
    </div>
  );
});

if (__DEV__) {
  ProgressBar.displayName = 'ProgressBar';
}

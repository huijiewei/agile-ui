import { __DEV__ } from '@agile-ui/utils';
import { primitiveComponent } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';
import { cx } from 'twind';

export type ProgressProps = {
  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 值
   */
  value?: number;

  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 条纹
   */
  striped?: boolean;

  /**
   * 动画
   */
  animate?: boolean;

  /**
   * 不明确
   */
  indeterminate?: boolean;

  /**
   * 标签
   */
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
    <div className="relative bg-gray-100 w-full overflow-hidden h-2 rounded">
      <div
        ref={ref}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
        {...rest}
        className={cx('rounded h-full transition-[width]', `bg-${color}-500`, className)}
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

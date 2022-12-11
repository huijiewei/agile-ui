import { primitiveComponent } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';
import { cx } from '@twind/core';

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

const progressBarSizes = {
  xs: {
    bar: 'h-1',
    text: 'text-[2px]',
  },
  sm: {
    bar: 'h-2',
    text: 'text-[6px]',
  },
  md: {
    bar: 'h-3',
    text: 'text-xs',
  },
  lg: {
    bar: 'h-4',
    text: 'text-sm',
  },
  xl: {
    bar: 'h-5',
    text: 'text-sm',
  },
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
    <div className={cx('relative w-full overflow-hidden rounded bg-gray-100', progressBarSizes[size]['bar'])}>
      <div
        ref={ref}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
        className={cx(
          'flex h-full items-center justify-center rounded-none text-white transition-[width]',
          `bg-${color}-500`,
          progressBarSizes[size]['text'],
          className
        )}
        style={{ width: `${value}%` }}
        {...rest}
      >
        {children || label}
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

import { cx } from '@twind/core';
import { polymorphicComponent } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';

export type SpinnerProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 提示文本
   * @default '加载中…'
   */
  label?: string;

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;
};

const SpinnerSizes = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
  xl: 'h-7 w-7 border-[3px]',
};

/**
 * 加载器
 */
export const Spinner = polymorphicComponent<'span', SpinnerProps>((props, ref) => {
  const { as: Component = 'span', label = '加载中…', className, color = 'blue', size = 'md', ...rest } = props;
  return (
    <Component
      className={cx(
        'inline-block animate-spin rounded-full',
        SpinnerSizes[size],
        color
          ? `border-t-${color}-500 border-r-${color}-500 border-b-${color}-100 border-l-${color}-100`
          : 'border-t-current border-r-current border-b-transparent border-l-transparent',
        className
      )}
      ref={ref}
      {...rest}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Component>
  );
});

Spinner.displayName = 'Spinner';

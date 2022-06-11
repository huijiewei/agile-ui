import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { polymorphicComponent } from '../utils/component';
import type { ColorWithLevel, Size } from '../utils/types';
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
   * @default 'current'
   */

  color?: ColorWithLevel;

  /**
   * 空白区域颜色
   * @default 'transparent'
   */
  emptyColor?: ColorWithLevel;
};

const SpinnerStyles = {
  base: 'inline-block animate-spin rounded-full border-2',
  sizes: {
    xs: 'h-2 w-2',
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  },
};

/**
 * 加载器
 */
export const Spinner = polymorphicComponent<'div', SpinnerProps>((props, ref) => {
  const {
    as: Component = 'div',
    label = '加载中…',
    className,
    color = 'current',
    emptyColor = 'transparent',
    size = 'md',
    ...rest
  } = props;
  return (
    <Component
      className={tx(
        SpinnerStyles.base,
        SpinnerStyles.sizes[size],
        `border-t-${color} border-r-${color} border-b-${emptyColor} border-l-${emptyColor}`,
        className
      )}
      ref={ref}
      {...rest}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Component>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

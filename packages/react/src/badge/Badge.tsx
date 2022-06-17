import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { ScaleColor, Size } from '../utils/types';

export type BadgeProps = {
  /**
   * 形式
   * @default 'light'
   */
  variant?: 'solid' | 'outline' | 'light';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 大小
   * @default 'md'
   */
  size?: Size;
};

const badgeSizes = {
  xs: 'px-2 text-sm',
  sm: 'px-1.5 text-[13px]',
  md: 'px-2 text-[13px]',
  lg: 'px-3 text-md',
  xl: 'px-5 text-lg',
};

const badgeVariants = (color: string) => {
  return {
    solid: [`text-white dark:text-black border-transparent bg-${color}-600`],
    outline: [`border-current text-${color}-600 bg-white dark:bg-black`],
    light: [`border-transparent text-${color}-700 bg-${color}-100`],
  };
};

export const Badge = primitiveComponent<'span', BadgeProps>((props, ref) => {
  const { color = 'blue', size = 'md', variant = 'light', className, children, ...rest } = props;

  return (
    <span
      ref={ref}
      className={tx(
        'inline-block align-middle border whitespace-nowrap rounded font-bold uppercase',
        badgeSizes[size],
        badgeVariants(color)[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

if (__DEV__) {
  Badge.displayName = 'Badge';
}

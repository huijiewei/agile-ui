import type { Color } from '../utils/types';
import { primitiveComponent } from '../utils/component';
import { cx } from '@twind/core';

export type DividerProps = {
  /**
   * 颜色
   * @default "gray"
   */
  color?: Color;

  /**
   * 垂直分割线
   * @default false
   */
  vertical?: boolean;

  /**
   * 分割线大小
   * @default 1
   */
  size?: number;

  /**
   * 分割线样式
   * @default "solid"
   */
  variant?: 'dashed' | 'dotted' | 'solid';

  /**
   * 分割线文字位置
   * @default "center"
   */
  position?: 'left' | 'right' | 'center';
};

export const Divider = primitiveComponent<'div', DividerProps>((props, ref) => {
  const {
    color = 'gray',
    vertical = false,
    size = 1,
    variant = 'solid',
    position = 'center',
    className,
    children,
    ...rest
  } = props;

  const hasLabel = !!children && !vertical;

  return (
    <div
      role={'separator'}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      ref={ref}
      className={cx(
        'm-0 border-0',
        hasLabel
          ? `before:(content-[""] mr-2 flex h-0 shrink items-center text-xs ${
              position == 'left' ? 'grow-0 basis-5' : 'grow basis-0'
            } border-${variant} border-t-[${size}px] border-t-${color}-300) after:(content-[""] ml-2 shrink ${
              position == 'right' ? 'grow-0 basis-5' : 'grow basis-0'
            } h-0 border-${variant} border-t-[${size}px] border-t-${color}-300)`
          : vertical
          ? `border-${variant} border-l-[${size}px] border-l-${color}-300 h-auto self-stretch`
          : `border-${variant} border-t-[${size}px] border-t-${color}-300`,

        className
      )}
      {...rest}
    >
      {hasLabel && children}
    </div>
  );
});

Divider.displayName = 'Divider';

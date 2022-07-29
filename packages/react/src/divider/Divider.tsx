import type { Color } from '../utils/types';
import { primitiveComponent } from '../utils/component';
import { cx } from 'twind';

export type DividerProps = {
  /**
   * 颜色
   * @default "gray"
   */
  color?: Color;

  /**
   * 分割线方向
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

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
    orientation = 'horizontal',
    size = 1,
    variant = 'solid',
    position = 'center',
    className,
    children,
    ...rest
  } = props;

  const horizontal = orientation === 'horizontal';
  const hasLabel = !!children && horizontal;

  return (
    <div
      role={'separator'}
      aria-orientation={orientation}
      ref={ref}
      className={cx(
        'border-0 m-0',
        hasLabel
          ? `flex items-center text-xs before:(content-[""] mr-2 h-0 shrink ${
              position == 'left' ? 'basis-5 grow-0' : 'basis-0 grow'
            } border-${variant} border-t-[${size}px] border-t-${color}-300) after:(content-[""] ml-2 shrink ${
              position == 'right' ? 'basis-5 grow-0' : 'basis-0 grow'
            } h-0 border-${variant} border-t-[${size}px] border-t-${color}-300)`
          : horizontal
          ? `border-${variant} border-t-[${size}px] border-t-${color}-300`
          : `border-${variant} border-l-[${size}px] border-l-${color}-300 h-full self-stretch`,

        className
      )}
      {...rest}
    >
      {hasLabel && children}
    </div>
  );
});
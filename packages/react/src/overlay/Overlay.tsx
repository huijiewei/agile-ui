import { __DEV__, isBoolean, isNumber } from '@agile-ui/utils';
import { tx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Color, ScaleColor } from '../utils/types';

export type OverlayProps = {
  /**
   * 透明度
   * @default 60
   */
  opacity?: number;

  /**
   * 颜色
   * @default 'black'
   */
  color?: Color;

  /**
   * 模糊效果
   * @default 0
   */
  blur?: number;

  /**
   * 圆角大小
   * @default false
   */
  radius?: number | string | boolean;

  /**
   * 反色效果
   * @default false
   */
  inverse?: boolean;
};

export const Overlay = primitiveComponent<'div', OverlayProps>((props, ref) => {
  const { className, opacity = 60, color = 'black', inverse = false, radius = false, blur = 0, ...rest } = props;

  const colorClass =
    color == 'white'
      ? 'bg-white dark:bg-black'
      : color == 'black'
      ? 'bg-black dark:bg-white'
      : inverse
      ? `bg-${color}-100`
      : `bg-${color}-500`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlay = (other?: Record<string, any>) => {
    return (
      <div
        ref={ref}
        className={tx(
          'absolute inset-0 z-20',
          colorClass,
          opacity > 1 ? `opacity-${opacity}` : `opacity-[${opacity}]`,
          isBoolean(radius) && radius ? 'rounded' : isNumber(radius) ? `rounded-[${radius}px]` : `rounded-${radius}`,
          className
        )}
        {...other}
      />
    );
  };

  if (blur) {
    return (
      <div
        className={tx(
          'absolute inset-0 z-10',
          `backdrop-blur-[${blur}px]`,
          isNumber(radius) ? `rounded-[${radius}px]` : `rounded-${radius}`,
          className
        )}
        {...rest}
      >
        {overlay()}
      </div>
    );
  }

  return overlay(rest);
});

if (__DEV__) {
  Overlay.displayName = 'Overlay';
}

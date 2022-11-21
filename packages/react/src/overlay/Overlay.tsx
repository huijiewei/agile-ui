import { Dict, isBoolean, isNumber } from '@agile-ui/utils';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import type { Color } from '../utils/types';

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
};

export const Overlay = primitiveComponent<'div', OverlayProps>((props, ref) => {
  const { className, opacity = 75, color = 'black', radius = false, blur = 0, ...rest } = props;

  const colorClass =
    color == 'white' ? 'bg-white dark:bg-gray-700' : color == 'black' ? 'bg-black dark:bg-gray-200' : `bg-${color}-50`;

  const overlay = (other?: Dict) => {
    return (
      <div
        ref={ref}
        className={cx(
          'absolute inset-0 z-10',
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
        className={cx(
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

Overlay.displayName = 'Overlay';

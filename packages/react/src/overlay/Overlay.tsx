import { __DEV__, isBoolean, isNumber } from '@agile-ui/utils';
import { tx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Color } from '../utils/types';

export type OverlayProps = { opacity?: number; color?: Color; blur?: number; radius?: number | string | boolean };

export const Overlay = primitiveComponent<'div', OverlayProps>((props, ref) => {
  const { className, opacity = 60, color = 'gray', radius = 0, blur = 0, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlay = (other?: Record<string, any>) => {
    return (
      <div
        ref={ref}
        className={tx(
          'absolute inset-0 z-20',
          `bg-${color}-900`,
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

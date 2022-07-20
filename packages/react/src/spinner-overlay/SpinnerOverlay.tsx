import { __DEV__ } from '@agile-ui/utils';
import { cloneElement, ReactElement } from 'react';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import { Overlay } from '../overlay/Overlay';
import { Spinner } from '../spinner/Spinner';
import { primitiveComponent } from '../utils/component';
import type { Color } from '../utils/types';

export type SpinnerOverlayProps = {
  /**
   * 动画过渡
   * @default 300
   */
  duration?: number;

  /**
   * 圆角效果
   * @default false
   */
  radius?: number | string | boolean;

  /**
   * 透明度
   * @default 75
   */
  opacity?: number;

  /**
   * 颜色
   * @default 'white'
   */
  color?: Color;

  /**
   * 模糊效果
   * @default 0
   */
  blur?: number;

  /**
   * 是否可见
   */
  visible: boolean;
};

export const SpinnerOverlay = primitiveComponent<'div', SpinnerOverlayProps>((props, ref) => {
  const { duration, visible, className, radius, opacity = 75, color = 'white', blur, children, ...rest } = props;

  const spinner = (children as ReactElement) || <Spinner size={'xl'} color={'blue'} />;

  return (
    <Animation
      duration={duration}
      show={visible}
      ref={ref}
      className={cx('absolute inset-0 z-10 flex items-center justify-center overflow-hidden', className)}
      {...rest}
    >
      {cloneElement(spinner, { className: 'z-20' })}
      <Overlay radius={radius} opacity={opacity} color={color} blur={blur}></Overlay>
    </Animation>
  );
});

if (__DEV__) {
  SpinnerOverlay.displayName = 'SpinnerOverlay';
}

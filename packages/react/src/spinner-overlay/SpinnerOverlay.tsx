import { cloneElement, ReactElement } from 'react';
import { cx } from '@twind/core';
import { Overlay } from '../overlay/Overlay';
import { Spinner } from '../spinner/Spinner';
import { primitiveComponent } from '../utils/component';
import type { Color } from '../utils/types';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';

export type SpinnerOverlayProps = {
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
  const { visible, className, radius, opacity = 75, color = 'white', blur, children, ...rest } = props;

  const spinner = (children as ReactElement) || <Spinner size={'xl'} color={'blue'} />;

  return (
    <AnimatePresence>
      {visible && (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={ref}
          className={cx('absolute inset-0 z-10 flex items-center justify-center overflow-hidden', className)}
          {...rest}
        >
          {cloneElement(spinner, { className: 'z-20' })}
          <Overlay radius={radius} opacity={opacity} color={color} blur={blur}></Overlay>
        </Motion>
      )}
    </AnimatePresence>
  );
});

SpinnerOverlay.displayName = 'SpinnerOverlay';

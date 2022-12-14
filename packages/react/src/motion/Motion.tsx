import { m, MotionProps } from 'framer-motion';
import { Box } from '../box/Box';

export { AnimatePresence } from 'framer-motion';

const MotionPresets = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } },
  scale: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } },
  slideUp: {
    initial: { x: 0, y: '100%' },
    animate: { x: 0, y: 0 },
    exit: { x: 0, y: '100%' },
    transition: { duration: 0.25 },
  },
  slideDown: {
    initial: { x: 0, y: '-100%' },
    animate: { x: 0, y: 0 },
    exit: { x: 0, y: '-100%' },
    transition: { duration: 0.25 },
  },
  slideLeft: {
    initial: { x: '100%', y: 0 },
    animate: { x: 0, y: 0 },
    exit: { x: '100%', y: 0 },
    transition: { duration: 0.25 },
  },
  slideRight: {
    initial: { x: '-100%', y: 0 },
    animate: { x: 0, y: 0 },
    exit: { x: '-100%', y: 0 },
    transition: { duration: 0.25 },
  },
  none: {},
};

export type MotionPreset = keyof typeof MotionPresets;

export type MotionComponentProps = {
  /**
   * 预设动画
   * @default 'fade'
   */
  motionPreset?: MotionPreset;

  /**
   * 动画属性 @see https://www.framer.com/docs/component/#props
   */
  motionProps?: MotionProps;
};

export const getMotionProps = (
  motionPreset: MotionPreset,
  fallback: MotionProps | undefined
): MotionProps | undefined => {
  return MotionPresets[motionPreset] || fallback;
};

export const Motion = m(Box);

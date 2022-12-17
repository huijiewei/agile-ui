import { m, MotionProps } from 'framer-motion';
import { Box } from '../box/Box';
import type { MotionPreset } from './MotionPresets';
import { MotionPresets } from './MotionPresets';

export { AnimatePresence } from 'framer-motion';

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

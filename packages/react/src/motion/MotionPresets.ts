export const MotionPresets = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } },
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

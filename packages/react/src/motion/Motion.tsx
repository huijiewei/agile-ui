import { __DEV__ } from '@agile-ui/utils';
import { domAnimation, LazyMotion, m, MotionProps } from 'framer-motion';
import { primitiveComponent } from '../utils/component';

export const Motion = primitiveComponent<'div', MotionProps>((props, ref) => {
  const {
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    exit = { opacity: 0 },
    transition = { duration: 0.2 },
    ...rest
  } = props;

  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={initial} animate={animate} exit={exit} transition={transition} ref={ref} {...rest} />
    </LazyMotion>
  );
});

if (__DEV__) {
  Motion.displayName = 'Motion';
}

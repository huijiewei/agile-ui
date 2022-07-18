import { useAnimation } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalOverlay = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;
  const { open, animation = {}, lockScroll } = useModal();

  const { duration = 300 } = animation;

  const { stage, shouldMount } = useAnimation(open, duration);

  if (!shouldMount) {
    return null;
  }

  return (
    <FloatingOverlay
      lockScroll={lockScroll}
      ref={ref}
      className={cx(
        'bg-black z-40',
        `duration-[${duration}ms] transition-opacity`,
        stage == 'enter' ? 'opacity-60' : 'opacity-0',
        className
      )}
      {...rest}
    />
  );
});

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}

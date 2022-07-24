import { __DEV__ } from '@agile-ui/utils';
import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';
import { Presence } from '../animation/Presence';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';

export const ModalOverlay = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;
  const {
    open,
    animation: { duration, transition },
    lockScroll,
  } = useModal();

  return (
    <Presence>
      {open && (
        <Animation
          as={FloatingOverlay}
          lockScroll={lockScroll}
          ref={ref}
          enter={'opacity-60'}
          exit={'opacity-0'}
          transition={transition}
          duration={duration}
          className={cx('z-30 bg-black dark:bg-black', className)}
          {...rest}
        />
      )}
    </Presence>
  );
});

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}

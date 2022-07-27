import { __DEV__ } from '@agile-ui/utils';
import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import { useModal } from './ModalProvider';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';

export const ModalOverlay = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;
  const { open, lockScroll } = useModal();

  return (
    <AnimatePresence>
      {open && (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          as={FloatingOverlay}
          lockScroll={lockScroll}
          ref={ref}
          className={cx('z-30 bg-black dark:bg-black', className)}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
});

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}

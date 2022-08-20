import { useTimeout, useUpdateEffect } from '@agile-ui/react-hooks';
import { useEffect, useState } from 'react';
import { Toast } from './Toast';
import type { ToastOptions } from './ToastProvider';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../motion/Motion';

type ToastContainerProps = Omit<ToastOptions, 'position'>;

export const ToastContainer = (props: ToastContainerProps) => {
  const { id, duration = 5000, remove, onRemove, onClose, ...rest } = props;

  const [show, setShow] = useState(false);
  const [delay, setDelay] = useState(duration);

  useEffect(() => {
    setShow(true);
  }, []);

  useUpdateEffect(() => {
    setDelay(duration);
  }, [duration]);

  const handleMouseEnter = () => setDelay(null);
  const handleMouseLeave = () => setDelay(duration);

  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  const handleExit = () => {
    onRemove && onRemove();
  };

  useEffect(() => {
    if (remove) {
      setShow(false);
      onClose && onClose();
    }
  }, [onClose, remove]);

  useTimeout(handleClose, delay);

  return (
    <AnimatePresence onExitComplete={handleExit}>
      {show && (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          as={'li'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={'flex flex-col items-center'}
          role="status"
          aria-atomic="true"
        >
          <Toast id={id} onClose={handleClose} className={'pointer-events-auto'} {...rest}></Toast>
        </Motion>
      )}
    </AnimatePresence>
  );
};

ToastContainer.displayName = 'ToastComponent';

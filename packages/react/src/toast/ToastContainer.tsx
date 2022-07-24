import { useTimeout, useUpdateEffect } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { useEffect, useState } from 'react';
import { Animation } from '../animation/Animation';
import { Presence } from '../animation/Presence';
import { Toast } from './Toast';
import type { ToastOptions } from './ToastProvider';

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
    <Presence onExitComplete={handleExit}>
      {show && (
        <Animation
          as={'li'}
          duration={200}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={'flex flex-col items-center'}
          role="status"
          aria-atomic="true"
        >
          <Toast id={id} onClose={handleClose} className={'pointer-events-auto'} {...rest}></Toast>
        </Animation>
      )}
    </Presence>
  );
};

if (__DEV__) {
  ToastContainer.displayName = 'ToastComponent';
}

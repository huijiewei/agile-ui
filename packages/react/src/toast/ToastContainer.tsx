import { useTimeout, useUpdateEffect } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { useEffect, useState } from 'react';
import { Animation } from '../animation/Animation';
import { Toast } from './Toast';
import type { ToastOptions } from './ToastTypes';

export const ToastContainer = (props: ToastOptions) => {
  const { id, remove, onClose, onRemove, duration = 5000, ...rest } = props;

  const [show, setShow] = useState(false);
  const [delay, setDelay] = useState(duration);

  useEffect(() => {
    setShow(true);
  }, []);

  useUpdateEffect(() => {
    setDelay(duration);
  }, [duration]);

  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);

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
    }
  }, [remove]);

  useTimeout(handleClose, delay);

  return (
    <Animation
      as={'li'}
      show={show}
      onExit={handleExit}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={'flex flex-col items-center'}
      role="status"
      aria-atomic="true"
    >
      <Toast id={id} onClose={handleClose} className={'pointer-events-auto'} {...rest}></Toast>
    </Animation>
  );
};

if (__DEV__) {
  ToastContainer.displayName = 'ToastComponent';
}

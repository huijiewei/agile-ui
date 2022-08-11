import { Ref, useRef, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const ref = useRef<T>(null);
  const [hover, setHover] = useState(false);

  useEventListener(
    'mouseenter',
    () => {
      setHover(true);
    },
    ref
  );
  useEventListener(
    'mouseleave',
    () => {
      setHover(false);
    },
    ref
  );

  return [ref, hover];
};

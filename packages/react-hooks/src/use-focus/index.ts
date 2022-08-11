import { RefObject, useRef, useState } from 'react';
import { useEventListener } from '../use-event-listener';

export const useFocus = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [focus, setFocus] = useState(false);

  useEventListener('focus', () => setFocus(true), ref);
  useEventListener('blur', () => setFocus(false), ref);

  return [ref, focus];
};

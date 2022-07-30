import { useCallback, useState } from 'react';
import type { FocusEvent } from 'react';

export type UseFocusOptions<T> = {
  state?: boolean;
  onBlur?: (e: FocusEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
};

export const useFocus = <T>(options: UseFocusOptions<T>) => {
  const { state = false, onBlur, onFocus } = options;

  const [focus, setFocus] = useState(state);

  const handleBlur = useCallback(
    (e: FocusEvent<T>) => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  const handleFocus = useCallback(
    (e: FocusEvent<T>) => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    [onFocus]
  );

  return { focus, handleBlur, handleFocus };
};

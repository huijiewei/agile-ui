import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createContext } from '../utils/context';

type FocusVisibleContextValue = { hasSetup: boolean; hasKeyboardEvent: boolean };

const [FocusVisibleContextProvider, useFocusVisibleContext] = createContext<FocusVisibleContextValue>({
  name: 'FocusVisibleContext',
  strict: false,
});

type Options = {
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
};

export const useFocusVisible = (options: Options) => {
  const { hasSetup, hasKeyboardEvent } = useFocusVisibleContext();
  const [focused, setFocused] = useState(false);

  const handleOnBlur = (e: FocusEvent) => {
    setFocused(false);
    options.onBlur && options.onBlur(e);
  };

  const handleOnFocus = (e: FocusEvent) => {
    setFocused(true);
    options.onFocus && options.onFocus(e);
  };

  const focusVisible = hasSetup ? hasKeyboardEvent && focused : focused;

  return {
    focusVisible,
    onBlur: handleOnBlur,
    onFocus: handleOnFocus,
  };
};

export const FocusVisibleProvider = ({ children }: { children: ReactNode }) => {
  const [hasKeyboardEvent, setHasKeyboardEvent] = useState(true);

  useEffect(() => {
    if (typeof window == 'undefined') {
      return;
    }

    const handleKeyboardEvent = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey || e.key == 'Control' || e.key == 'Shift' || e.key == 'Meta') {
        return;
      }

      setHasKeyboardEvent(true);
    };

    const handleClickEvent = (e: MouseEvent) => {
      if (e.isTrusted || e.detail == 0) {
        setHasKeyboardEvent(true);
      } else {
        setHasKeyboardEvent(false);
      }
    };

    document.addEventListener('keydown', handleKeyboardEvent, true);
    document.addEventListener('click', handleClickEvent, true);

    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent);
      document.removeEventListener('click', handleClickEvent);
    };
  }, [setHasKeyboardEvent]);

  return (
    <FocusVisibleContextProvider value={{ hasSetup: true, hasKeyboardEvent }}>{children}</FocusVisibleContextProvider>
  );
};

import { useEffect, useState } from 'react';

type Modality = 'keyboard' | 'pointer' | 'virtual';
type HandlerEvent = PointerEvent | MouseEvent | KeyboardEvent | FocusEvent;
type Handler = (modality: Modality, e: HandlerEvent | null) => void;

let hasSetup = false;
let modality: Modality | null = null;
let hasEventBeforeFocus = false;
let hasBlurredWindowRecently = false;

const handlers = new Set<Handler>();

const trigger = (modality: Modality, event: HandlerEvent | null) => {
  handlers.forEach((handler) => handler(modality, event));
};

const isMac =
  typeof window !== 'undefined' && window.navigator != null ? /^Mac/.test(window.navigator.platform) : false;

const handleKeyboardEvent = (event: KeyboardEvent) => {
  hasEventBeforeFocus = true;

  if (
    event.metaKey ||
    (!isMac && event.altKey) ||
    event.ctrlKey ||
    event.key == 'Control' ||
    event.key == 'Shift' ||
    event.key == 'Meta'
  ) {
    return;
  }

  modality = 'keyboard';
  trigger('keyboard', event);
};

const handlePointerEvent = (event: PointerEvent | MouseEvent) => {
  modality = 'pointer';

  if (event.type == 'mousedown' || event.type == 'pointerdown') {
    hasEventBeforeFocus = true;
    const target = event.composedPath ? event.composedPath()[0] : event.target;
    if ((target as HTMLElement).matches(':focus-visible')) return;
    trigger('pointer', event);
  }
};

const isVirtualClick = (event: MouseEvent | PointerEvent): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((event as any).mozInputSource === 0 && event.isTrusted) return true;
  return event.detail == 0 && !(event as PointerEvent).pointerType;
};

const handleClickEvent = (e: MouseEvent) => {
  if (isVirtualClick(e)) {
    hasEventBeforeFocus = true;
    modality = 'virtual';
  }
};

const handleWindowFocus = (event: FocusEvent) => {
  if (event.target == window || event.target == document) {
    return;
  }

  if (!hasEventBeforeFocus && !hasBlurredWindowRecently) {
    modality = 'virtual';
    trigger('virtual', event);
  }

  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = false;
};

const handleWindowBlur = () => {
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = true;
};

const isFocusVisible = () => {
  return modality !== 'pointer';
};

const setupGlobalFocusEvents = () => {
  if (typeof window === 'undefined' || hasSetup) {
    return;
  }

  const { focus } = HTMLElement.prototype;

  HTMLElement.prototype.focus = function focusElement(...args) {
    hasEventBeforeFocus = true;
    focus.apply(this, args);
  };

  document.addEventListener('keydown', handleKeyboardEvent, true);
  document.addEventListener('keyup', handleKeyboardEvent, true);
  document.addEventListener('click', handleClickEvent, true);

  window.addEventListener('focus', handleWindowFocus, true);
  window.addEventListener('blur', handleWindowBlur, false);

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', handlePointerEvent, true);
    document.addEventListener('pointermove', handlePointerEvent, true);
    document.addEventListener('pointerup', handlePointerEvent, true);
  } else {
    document.addEventListener('mousedown', handlePointerEvent, true);
    document.addEventListener('mousemove', handlePointerEvent, true);
    document.addEventListener('mouseup', handlePointerEvent, true);
  }

  hasSetup = true;
};

export const useFocusVisible = (): {
  focusVisible: boolean;
} => {
  const [focusVisible, setFocusVisible] = useState(isFocusVisible());

  useEffect(() => {
    setupGlobalFocusEvents();

    const handler = () => {
      setFocusVisible(isFocusVisible());
    };

    handlers.add(handler);
    return () => {
      handlers.delete(handler);
    };
  }, []);

  return { focusVisible };
};

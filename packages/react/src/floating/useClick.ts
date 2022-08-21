import type { ElementProps, FloatingContext, ReferenceType } from '@floating-ui/react-dom-interactions';
import { useRef } from 'react';

export interface Props {
  enabled?: boolean;
  pointerDown?: boolean;
  toggle?: boolean;
  ignoreMouse?: boolean;
  ignoreKeyboard?: boolean;
}

export const useClick = <RT extends ReferenceType = ReferenceType>(
  { open, onOpenChange, dataRef, refs }: FloatingContext<RT>,
  { enabled = true, pointerDown = false, toggle = true, ignoreMouse = false, ignoreKeyboard = false }: Props = {}
): ElementProps => {
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>();

  function isButton() {
    return refs.domReference.current?.tagName === 'BUTTON';
  }

  function isSpaceIgnored() {
    return refs.domReference.current?.matches(
      "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
    );
  }

  if (!enabled) {
    return {};
  }

  return {
    reference: {
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
      },
      onMouseDown(event) {
        if (event.button !== 0) {
          return;
        }

        if (pointerTypeRef.current === 'mouse' && ignoreMouse) {
          return;
        }

        if (!pointerDown) {
          return;
        }

        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'mousedown' : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }

        dataRef.current.openEvent = event.nativeEvent;
      },
      onClick(event) {
        if (pointerDown && pointerTypeRef.current) {
          pointerTypeRef.current = undefined;
          return;
        }

        if (pointerTypeRef.current === 'mouse' && ignoreMouse) {
          return;
        }

        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'click' : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }

        dataRef.current.openEvent = event.nativeEvent;
      },
      onKeyDown(event) {
        pointerTypeRef.current = undefined;

        if (ignoreKeyboard) {
          return;
        }

        if (isButton()) {
          return;
        }

        if (event.key === ' ' && !isSpaceIgnored()) {
          event.preventDefault();
        }

        if (event.key === 'Enter') {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      },
      onKeyUp(event) {
        if (ignoreKeyboard) {
          return;
        }

        if (isButton() || isSpaceIgnored()) {
          return;
        }

        if (event.key === ' ') {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      },
    },
  };
};

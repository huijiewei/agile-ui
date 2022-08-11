import { clamp } from '@agile-ui/utils';
import { RefObject, useEffect, useRef, useState } from 'react';

export type UseMovePosition = {
  x: number;
  y: number;
};

export const clampUseMovePosition = (position: UseMovePosition) => ({
  x: clamp(position.x, [0, 1]),
  y: clamp(position.y, [0, 1]),
});

type useMoveHandlers = {
  onScrubStart?(): void;
  onScrubEnd?(): void;
};

export const useMove = <T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void,
  handlers?: useMoveHandlers,
  dir: 'ltr' | 'rtl' = 'ltr'
): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const mounted = useRef<boolean>(false);
  const sliding = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const onScrub = ({ x, y }: UseMovePosition) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current) {
          ref.current.style.userSelect = 'none';
          const rect = ref.current.getBoundingClientRect();

          if (rect.width && rect.height) {
            const _x = clamp((x - rect.left) / rect.width, [0, 1]);
            onChange({
              x: dir === 'ltr' ? _x : 1 - _x,
              y: clamp((y - rect.top) / rect.height, [0, 1]),
            });
          }
        }
      });
    };

    const bindEvents = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopScrubbing);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopScrubbing);
    };

    const unbindEvents = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopScrubbing);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopScrubbing);
    };

    const startScrubbing = () => {
      if (!sliding.current && mounted.current) {
        sliding.current = true;
        typeof handlers?.onScrubStart === 'function' && handlers.onScrubStart();
        setActive(true);
        bindEvents();
      }
    };

    const stopScrubbing = () => {
      if (sliding.current && mounted.current) {
        sliding.current = false;
        setActive(false);
        unbindEvents();
        setTimeout(() => {
          typeof handlers?.onScrubEnd === 'function' && handlers.onScrubEnd();
        }, 0);
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing();
      onMouseMove(event);
    };

    const onMouseMove = (event: MouseEvent) => onScrub({ x: event.clientX, y: event.clientY });

    const onTouchStart = (event: TouchEvent) => {
      startScrubbing();
      event?.preventDefault();
      onTouchMove(event);
    };

    const onTouchMove = (event: TouchEvent) => {
      event?.preventDefault();
      onScrub({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
    };

    const element = ref.current;

    if (element) {
      element.addEventListener('mousedown', onMouseDown);
      element.addEventListener('touchstart', onTouchStart, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchstart', onTouchStart);
      }
    };
  }, [dir, handlers, onChange]);

  return [ref, active];
};

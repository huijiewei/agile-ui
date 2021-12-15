import { useEffect, useRef, useState } from 'react';

export type Direction = 'ltr' | 'rtl';

export const useDirection = (element: HTMLElement | null, directionProp?: Direction) => {
  const [direction, setDirection] = useState<Direction>('ltr');
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const rAFRef = useRef<number>(0);

  useEffect(() => {
    if (directionProp == undefined && element?.parentElement) {
      const computedStyle = getComputedStyle(element.parentElement);
      setComputedStyle(computedStyle);
    }
  }, [element, directionProp]);

  useEffect(() => {
    function getDirection() {
      rAFRef.current = requestAnimationFrame(() => {
        const direction = computedStyle?.direction as Direction | '' | undefined;

        if (direction) {
          setDirection(direction);
        }

        getDirection();
      });
    }

    if (directionProp == undefined) {
      getDirection();
    }
    return () => cancelAnimationFrame(rAFRef.current);
  }, [computedStyle, directionProp, setDirection]);

  return directionProp || direction;
};

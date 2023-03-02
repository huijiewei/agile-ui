import type { RefObject } from 'react';
import { useMemo } from 'react';
import type { FloatingContext } from '@floating-ui/react';
import { FloatingArrow, FloatingArrowProps } from '@floating-ui/react';
import { createContext } from '../utils/context';
import { useColorModeState } from '../provider/ColorModeProvider';
import { tw } from '@twind/core';
import { autoColorKey } from '@agile-ui/twind';

export type FloatingArrowContextValue = {
  setArrow: RefObject<SVGSVGElement>;
  context: FloatingContext;
  color: string;
  borderColor: string;
};

const [FloatingArrowProvider, useFloatingArrow] = createContext<FloatingArrowContextValue>({
  strict: true,
  name: 'FloatingArrowContext',
});

export { FloatingArrowProvider, useFloatingArrow };

export const FloatingArrowComponent = (props: Omit<FloatingArrowProps, 'context' | 'stroke' | 'fill'>) => {
  const arrow = useFloatingArrow();

  const { darkMode } = useColorModeState();

  const color = useMemo(() => {
    const fill = tw.theme(
      `colors.${darkMode ? (arrow.color == 'white' ? 'gray.700' : autoColorKey(arrow.color)) : arrow.color}`
    );
    const stroke = tw.theme(`colors.${darkMode ? autoColorKey(arrow.borderColor) : arrow.borderColor}`);

    return {
      fill,
      stroke,
    };
  }, [darkMode, arrow.color, arrow.borderColor]);

  return (
    <FloatingArrow
      ref={arrow.setArrow}
      stroke={color.stroke}
      strokeWidth={2}
      fill={color.fill}
      width={11}
      height={6}
      context={arrow.context}
      {...props}
    />
  );
};

FloatingArrowComponent.displayName = 'FloatingMenuArrow';

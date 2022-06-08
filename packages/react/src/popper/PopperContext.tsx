import type { Placement } from '@floating-ui/react-dom';
import type { useFloating } from '@floating-ui/react-dom';
import type { Coords } from '@floating-ui/react-dom';
import type { Ref } from 'react';
import { createContext } from '../utils/context';

export type PopperContextValue = ReturnType<typeof useFloating> & {
  mounted: boolean;
  placement?: Placement;
  anchorRef: Ref<HTMLElement>;
  arrowRef: Ref<HTMLElement>;
  arrowSize?: (val: number) => void;
  arrowStyle?: Partial<Coords> & { centerOffset: number };
};

const [PopperProvider, usePopper] = createContext<PopperContextValue>({ strict: true, name: 'PopperContext' });

export { PopperProvider, usePopper };

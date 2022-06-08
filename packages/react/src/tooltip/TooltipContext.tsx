import type { PropsWithChildren } from 'react';
import { createContext } from '../utils/context';

type TooltipContextValue = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const [TooltipContextProvider, useTooltip] = createContext<TooltipContextValue>({
  strict: true,
  name: 'TooltipContext',
});

export { useTooltip };

export const TooltipProvider = (props: PropsWithChildren<TooltipContextValue>) => {
  const { children, ...rest } = props;
  return <TooltipContextProvider value={rest}>{children}</TooltipContextProvider>;
};

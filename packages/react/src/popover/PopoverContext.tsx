import type { RefObject } from 'react';
import { createContext } from '../utils/context';

type PopoverContextProps = {
  triggerRef: RefObject<HTMLElement>;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  customAnchor: boolean;
  customAnchorAdd(): void;
  customAnchorRemove(): void;
  modal: boolean;
};

const [PopoverProvider, usePopover] = createContext<PopoverContextProps>({
  strict: true,
  name: 'PopoverContext',
});

export { PopoverProvider, usePopover };

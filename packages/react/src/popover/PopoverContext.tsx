import type { Placement, Strategy } from '@floating-ui/react-dom-interactions';
import type { MutableRefObject } from 'react';
import { createContext } from '../utils/context';

type PopoverContextProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  strategy?: Strategy;
  placement?: 'auto' | Placement;
  anchorRef: MutableRefObject<HTMLDivElement>;
  arrowRef: MutableRefObject<HTMLSpanElement>;

  /**
   * 是否在 esc 按键时关闭浮动元素
   * @default true
   */
  escapeKey?: boolean;

  /**
   * 是否在参考元素的指针向下时关闭浮动元素
   * @default false
   */
  referencePointerDown?: boolean;

  /**
   * 是否在指针向下位于浮动元素和参考元素之外时关闭浮动元素
   * @default true
   */
  outsidePointerDown?: boolean;
};

const [PopoverProvider, usePopover] = createContext<PopoverContextProps>({
  strict: true,
  name: 'PopperContext',
});

export { PopoverProvider, usePopover };

import type { ContextData } from '@floating-ui/react-dom-interactions';
import type { HTMLProps, MutableRefObject } from 'react';
import { createContext } from '../utils/context';
import type { Dict, StringOrNumber } from '@agile-ui/utils';

type SelectContextValue = {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;

  selectedIndex: number[];
  onSelected: (index: number, value: StringOrNumber) => void;

  setOpen: (open: boolean) => void;

  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;

  listRef: MutableRefObject<(HTMLLIElement | null)[]>;
  dataRef: ContextData;
  closeOnSelect: boolean;
  sizeClass: string | string[];
};

const [SelectProvider, useSelect] = createContext<SelectContextValue>({
  strict: true,
  name: 'SelectContext',
});

export { SelectProvider, useSelect };

import type { StringOrNumber } from '@agile-ui/utils';
import type { ContextData } from '@floating-ui/react-dom-interactions';
import type { HTMLProps, MutableRefObject } from 'react';
import { createContext } from '../utils/context';

type SelectContextValue = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;

  setOpen: (open: boolean) => void;
  onChange: (value: Readonly<StringOrNumber> | StringOrNumber | null) => void;

  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;

  listRef: MutableRefObject<(HTMLLIElement | null)[]>;
  dataRef: ContextData;
  selectSize: string;
};

const [SelectProvider, useSelect] = createContext<SelectContextValue>({
  strict: true,
  name: 'SelectContext',
});

export { SelectProvider, useSelect };

import type { HTMLProps, MutableRefObject } from 'react';
import { createContext } from '../utils/context';
import type { Dict } from '@agile-ui/utils';

type SelectContextValue = {
  activeIndex: number | null;

  selectedIndex: number[];
  onSelected: (value: string | number) => void;

  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;

  listRef: MutableRefObject<(HTMLLIElement | null)[]>;
  sizeClass: string | string[];
};

const [SelectProvider, useSelect] = createContext<SelectContextValue>({
  strict: true,
  name: 'SelectContext',
});

export { SelectProvider, useSelect };

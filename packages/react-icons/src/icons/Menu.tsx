import { createIcon } from '../createIcon';

export const Menu = createIcon({
  displayName: 'PlusIcon',
  path: <path d="M4 6h16M4 12h16M4 18h16" />,
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

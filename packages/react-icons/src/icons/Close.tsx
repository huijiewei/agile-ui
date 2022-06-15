import { createIcon } from '../createIcon';

export const Close = createIcon({
  displayName: 'PlusIcon',
  path: <path d="M6 18L18 6M6 6l12 12" />,
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

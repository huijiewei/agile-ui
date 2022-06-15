import { createIcon } from '../createIcon';

export const Plus = createIcon({
  displayName: 'PlusIcon',
  path: <path d="M12 4v16m8-8H4" />,
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

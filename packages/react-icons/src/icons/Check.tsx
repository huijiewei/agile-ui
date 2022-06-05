import { createIcon } from '../createIcon';

export const Check = createIcon({
  displayName: 'CheckIcon',
  path: <path d="M4 12l6 6L20 6" />,
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

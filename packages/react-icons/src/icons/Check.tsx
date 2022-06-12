import { createIcon } from '../createIcon';

export const Check = createIcon({
  displayName: 'CheckIcon',
  path: <path d="M5 13l4 4L19 7" />,
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

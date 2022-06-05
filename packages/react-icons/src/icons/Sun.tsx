import { createIcon } from '../createIcon';

export const Sun = createIcon({
  displayName: 'SunIcon',
  path: (
    <>
      <path d="M12 3V2m0 20v-1m9-9h1M2 12h1m15.5-6.5L20 4M4 20l1.5-1.5M4 4l1.5 1.5m13 13L20 20" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  defaultProps: {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

import { createIcon } from '../createIcon';

export const CheckSmall = createIcon({
  displayName: 'CheckSmallIcon',
  path: (
    <>
      <path fill="currentColor" fillOpacity={0.01} d="M0 0h48v48H0z" />
      <path d="m10 24 10 10 20-20" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
});

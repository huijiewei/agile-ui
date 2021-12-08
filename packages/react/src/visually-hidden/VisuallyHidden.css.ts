import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

import { themeVars } from '@agile-ui/react';
import { style } from '@vanilla-extract/css';

const asideWidth = '200px';
const headerHeight = '50px';

export const appAsideClass = style({
  position: 'fixed',
  height: '100%',
  width: asideWidth,
  background: themeVars.color.gray['50'],
});

export const appMainClass = style({
  marginLeft: asideWidth,
});

export const appHeaderClass = style({
  position: 'fixed',
  background: themeVars.color.white,
  right: 0,
  padding: '0 20px',
  left: asideWidth,
  height: headerHeight,
  zIndex: '10',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const appContentClass = style({
  background: themeVars.color.gray['50'],
  marginTop: headerHeight,
});

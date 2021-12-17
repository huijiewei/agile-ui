import { themeVars } from '@agile-ui/react';
import { style } from '@vanilla-extract/css';

export const appAsideClass = style({
  position: 'fixed',
  height: '100%',
  background: themeVars.color.gray['50'],
});

export const height100vh = style({
  height: '100vh',
});

export const appContentClass = style({
  marginLeft: '200px',
});

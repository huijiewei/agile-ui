import { themeVars } from '@agile-ui/react';
import { style } from '@vanilla-extract/css';

export const appAsideClass = style({
  position: 'fixed',
  height: '100%',
  background: themeVars.color.gray['50'],
});

export const appAsideScrollAreaClass = style({
  height: '100vh',
});

export const appMainClass = style({
  marginLeft: '200px',
});

export const appHeaderClass = style({
  position: 'fixed',
  background: themeVars.color.white,
  right: 0,
  padding: '0 20px',
  left: '200px',
  height: '50px',
  zIndex: '10',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const appContentClass = style({
  background: themeVars.color.gray['50'],
  marginTop: '50px',
});

export const appFooterClass = style({
  height: '50px',
  zIndex: '10',
  padding: '0 20px',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
});

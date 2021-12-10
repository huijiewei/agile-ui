import { defaultTheme, themeVars } from '../src';
import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

createGlobalTheme(':root', themeVars, defaultTheme);

globalStyle('body', {
  fontFamily: themeVars.font.body,
  fontSize: themeVars.fontSize.md,
  backgroundColor: themeVars.color.white,
});

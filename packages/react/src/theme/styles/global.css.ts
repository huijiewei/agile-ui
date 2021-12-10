import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from './vars.css';

globalStyle('body', {
  fontFamily: themeVars.font.body,
  fontSize: themeVars.fontSize.md,
  backgroundColor: themeVars.color.white,
});

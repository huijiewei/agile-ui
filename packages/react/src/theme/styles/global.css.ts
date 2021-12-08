import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

globalStyle('body', {
  fontFamily: themeVars.font.body,
});

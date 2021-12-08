import { createThemeContract, globalStyle } from '@vanilla-extract/css';

import { fonts, fontSizes } from '../tokens/typography';
import { colors } from '../tokens/colors';

export const defaultTheme = {
  color: colors,
  font: fonts,
  fontSize: fontSizes,
};

export const themeVars = createThemeContract(defaultTheme);

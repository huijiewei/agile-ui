import { createThemeContract } from '@vanilla-extract/css';

import { fonts, fontSizes, fontWeights, lineHeights } from '../tokens/typography';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { borders } from '../tokens/borders';

export const defaultTheme = {
  color: colors,
  font: fonts,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  lineHeight: lineHeights,
  radius: radius,
  border: borders,
};

export const themeVars = createThemeContract(defaultTheme);

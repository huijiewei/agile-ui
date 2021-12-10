import { createThemeContract } from '@vanilla-extract/css';

import { fonts, fontSizes, fontWeights, lineHeights } from '@agile-ui/tokens';
import { colors } from '@agile-ui/tokens';
import { radius } from '@agile-ui/tokens';
import { borders } from '@agile-ui/tokens';

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

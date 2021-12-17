import { borders, colors, fonts, fontSizes, fontWeights, lineHeights, radius } from '@agile-ui/tokens';
import { createThemeContract } from '@vanilla-extract/css';

export const defaultTheme = {
  color: colors,
  font: fonts,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  lineHeight: lineHeights,
  radius: radius,
  border: borders,
};

export type Theme = typeof defaultTheme;

export const themeVars = createThemeContract(defaultTheme);

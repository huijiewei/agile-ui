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
  scrollArea: {
    scrollbar: {
      padding: '2px',
      width: '6px',
      height: '6px',
    },
    corner: {
      width: '0',
      height: '0',
    },
  },
};

export type Theme = typeof defaultTheme;

export const themeVars = createThemeContract(defaultTheme);

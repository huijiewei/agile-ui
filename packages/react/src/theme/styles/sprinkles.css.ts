import { breakpoints, spacing } from '@agile-ui/tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': `screen and (min-width: ${breakpoints.tablet})` },
    laptop: { '@media': `screen and (min-width: ${breakpoints.laptop})` },
    desktop: { '@media': `screen and (min-width: ${breakpoints.desktop})` },
  },
  defaultCondition: 'laptop',
  responsiveArray: ['mobile', 'tablet', 'laptop', 'desktop'],
  properties: {
    display: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'flow-root', 'contents'],
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
    paddingTop: spacing,
    paddingLeft: spacing,
    paddingBottom: spacing,
    paddingRight: spacing,
    marginTop: spacing,
    marginLeft: spacing,
    marginBottom: spacing,
    marginRight: spacing,
  },
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: { '@media': '(prefers-color-scheme: light)' },
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: false,
  properties: {},
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];

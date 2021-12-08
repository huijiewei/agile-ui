import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/theme.css';

const base = style({
  borderRadius: '3px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  outline: 'none',
  borderWidth: '1px',
});

const size = {
  xs: style({}),
  sm: style({}),
  md: style({
    fontSize: themeVars.fontSize.md,
    height: '32px',
  }),
  lg: style({}),
  xl: style({}),
};

const level = {
  primary: style({}),
  success: style({
    backgroundColor: '#fff',
    color: '#0070f3',
  }),
  naturel: style({}),
  warning: style({}),
  danger: style({}),
};

const variant = {
  solid: style({}),
  outline: style({}),
  ghost: style({}),
  link: style({}),
};

export const variants = recipe({
  base,
  variants: {
    size,
    level,
    variant,
  },
  compoundVariants: [
    {
      variants: {
        level: 'primary',
        variant: 'solid',
      },
      style: {
        borderColor: themeVars.color.primary['600'],
        backgroundColor: themeVars.color.primary['600'],
        color: themeVars.color.white,
      },
    },
  ],
});

export type ButtonVariants = RecipeVariants<typeof variants>;

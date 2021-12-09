import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/theme.css';

const base = style({
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  outline: 'none',
  border: themeVars.border['1px'],
  borderRadius: themeVars.radius.md,
  lineHeight: themeVars.lineHeight.base,
  padding: '0 16px',
});

const size = {
  xs: { fontSize: themeVars.fontSize.xs },
  sm: { fontSize: themeVars.fontSize.sm },
  md: { fontSize: themeVars.fontSize.md, height: '32px' },
  lg: { fontSize: themeVars.fontSize.lg },
  xl: { fontSize: themeVars.fontSize.xl },
};

const level = {
  primary: style({}),
  success: style({}),
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
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        level: 'primary',
        variant: 'solid',
      },
      style: {
        borderColor: themeVars.color.primary['500'],
        backgroundColor: themeVars.color.primary['500'],
        color: themeVars.color.white,
        selectors: {
          '&:hover': {
            borderColor: themeVars.color.primary['600'],
            backgroundColor: themeVars.color.primary['600'],
          },
          '&:active': {
            borderColor: themeVars.color.primary['800'],
            backgroundColor: themeVars.color.primary['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'success',
        variant: 'solid',
      },
      style: {
        borderColor: themeVars.color.success['500'],
        backgroundColor: themeVars.color.success['500'],
        color: themeVars.color.white,
        selectors: {
          '&:hover': {
            borderColor: themeVars.color.success['600'],
            backgroundColor: themeVars.color.success['600'],
          },
          '&:active': {
            borderColor: themeVars.color.primary['800'],
            backgroundColor: themeVars.color.primary['800'],
          },
        },
      },
    },
  ],
});

export type ButtonVariants = RecipeVariants<typeof variants>;

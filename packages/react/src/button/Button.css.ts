import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/vars.css';

const size = {
  xs: { fontSize: themeVars.fontSize.xs },
  sm: { fontSize: themeVars.fontSize.sm },
  md: { fontSize: themeVars.fontSize.md, height: '32px' },
  lg: { fontSize: themeVars.fontSize.lg },
  xl: { fontSize: themeVars.fontSize.xl },
};

const level = {
  primary: {
    borderColor: themeVars.color.primary['600'],
    selectors: {
      '&:hover': {
        borderColor: themeVars.color.primary['700'],
      },
      '&:active': {
        borderColor: themeVars.color.primary['800'],
      },
    },
  },
  success: {
    borderColor: themeVars.color.success['600'],
    selectors: {
      '&:hover': {
        borderColor: themeVars.color.success['700'],
      },
      '&:active': {
        borderColor: themeVars.color.success['800'],
      },
    },
  },
  natural: {
    borderColor: themeVars.color.natural['600'],
    selectors: {
      '&:hover': {
        borderColor: themeVars.color.natural['700'],
      },
      '&:active': {
        borderColor: themeVars.color.natural['800'],
      },
    },
  },
  warning: {
    borderColor: themeVars.color.warning['600'],
    selectors: {
      '&:hover': {
        borderColor: themeVars.color.warning['700'],
      },
      '&:active': {
        borderColor: themeVars.color.warning['800'],
      },
    },
  },
  danger: {
    borderColor: themeVars.color.danger['600'],
    selectors: {
      '&:hover': {
        borderColor: themeVars.color.danger['700'],
      },
      '&:active': {
        borderColor: themeVars.color.danger['800'],
      },
    },
  },
};

const variant = {
  solid: {
    color: themeVars.color.white,
  },
  outline: {
    backgroundColor: themeVars.color.white,
  },
  ghost: {},
  link: {},
};

export const buttonRecipes = recipe({
  base: {
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
  },
  variants: {
    size,
    level,
    variant,
    /**
     * If `true`, the button will be disabled.
     */
    disabled: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5,
      },
      false: {},
    },
    /**
     * If `true`, the button will be styled in its active state.
     */
    active: {
      true: {},
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
        backgroundColor: themeVars.color.primary['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.primary['700'],
          },
          '&:active': {
            backgroundColor: themeVars.color.primary['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'primary',
        variant: 'outline',
      },
      style: {
        color: themeVars.color.primary['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.primary['50'],
          },
          '&:active': {
            backgroundColor: themeVars.color.primary['100'],
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
        backgroundColor: themeVars.color.success['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.success['700'],
          },
          '&:active': {
            backgroundColor: themeVars.color.success['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'success',
        variant: 'outline',
      },
      style: {
        color: themeVars.color.success['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.success['50'],
          },
          '&:active': {
            backgroundColor: themeVars.color.primary['100'],
          },
        },
      },
    },
    {
      variants: {
        level: 'natural',
        variant: 'solid',
      },
      style: {
        backgroundColor: themeVars.color.natural['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.natural['700'],
          },
          '&:active': {
            backgroundColor: themeVars.color.natural['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'natural',
        variant: 'outline',
      },
      style: {
        color: themeVars.color.natural['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.natural['50'],
          },
          '&:active': {
            backgroundColor: themeVars.color.natural['100'],
          },
        },
      },
    },
    {
      variants: {
        level: 'warning',
        variant: 'solid',
      },
      style: {
        backgroundColor: themeVars.color.warning['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.warning['700'],
          },
          '&:active': {
            backgroundColor: themeVars.color.warning['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'warning',
        variant: 'outline',
      },
      style: {
        color: themeVars.color.warning['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.warning['50'],
          },
          '&:active': {
            backgroundColor: themeVars.color.warning['100'],
          },
        },
      },
    },
    {
      variants: {
        level: 'danger',
        variant: 'solid',
      },
      style: {
        backgroundColor: themeVars.color.danger['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.danger['700'],
          },
          '&:active': {
            backgroundColor: themeVars.color.danger['800'],
          },
        },
      },
    },
    {
      variants: {
        level: 'danger',
        variant: 'outline',
      },
      style: {
        color: themeVars.color.danger['600'],
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.danger['50'],
          },
          '&:active': {
            backgroundColor: themeVars.color.danger['100'],
          },
        },
      },
    },
  ],
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipes>;

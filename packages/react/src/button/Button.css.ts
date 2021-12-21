import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/vars.css';

const size = {
  xs: { fontSize: themeVars.fontSize.xs, height: '24px', padding: '0 8px' },
  sm: { fontSize: themeVars.fontSize.sm, height: '28px', padding: '0 12px' },
  md: { fontSize: themeVars.fontSize.md, height: '32px', padding: '0 16px' },
  lg: { fontSize: themeVars.fontSize.lg, height: '36px', padding: '0 20px' },
  xl: { fontSize: themeVars.fontSize.xl, height: '40px', padding: '0 24px' },
};

const level = {
  primary: {
    color: themeVars.color.primary['600'],
    borderColor: themeVars.color.primary['600'],
    ':hover': {
      color: themeVars.color.primary['700'],
      borderColor: themeVars.color.primary['700'],
    },
    ':active': {
      color: themeVars.color.primary['800'],
      borderColor: themeVars.color.primary['800'],
    },
  },
  success: {
    color: themeVars.color.success['600'],
    borderColor: themeVars.color.success['600'],
    ':hover': {
      color: themeVars.color.success['700'],
      borderColor: themeVars.color.success['700'],
    },
    ':active': {
      color: themeVars.color.success['800'],
      borderColor: themeVars.color.success['800'],
    },
  },
  natural: {
    color: themeVars.color.natural['600'],
    borderColor: themeVars.color.natural['600'],
    ':hover': {
      color: themeVars.color.natural['700'],
      borderColor: themeVars.color.natural['700'],
    },
    ':active': {
      color: themeVars.color.natural['800'],
      borderColor: themeVars.color.natural['800'],
    },
  },
  warning: {
    color: themeVars.color.warning['600'],
    borderColor: themeVars.color.warning['600'],
    ':hover': {
      color: themeVars.color.warning['700'],
      borderColor: themeVars.color.warning['700'],
    },
    ':active': {
      color: themeVars.color.warning['800'],
      borderColor: themeVars.color.warning['800'],
    },
  },
  danger: {
    color: themeVars.color.danger['600'],
    borderColor: themeVars.color.danger['600'],
    ':hover': {
      color: themeVars.color.danger['700'],
      borderColor: themeVars.color.danger['700'],
    },
    ':active': {
      color: themeVars.color.danger['800'],
      borderColor: themeVars.color.danger['800'],
    },
  },
};

const variant = {
  solid: {
    color: themeVars.color.white,
    ':hover': {
      color: themeVars.color.white,
    },
    ':active': {
      color: themeVars.color.white,
    },
  },
  outline: {
    backgroundColor: themeVars.color.white,
  },
  ghost: {},
  link: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': {
      textDecoration: 'underline',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    ':active': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
};

const baseStyle = style({
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
  textDecoration: 'none',
  fontWeight: themeVars.fontWeight.medium,
  userSelect: 'none',
  appearance: 'none',
});

export const buttonRecipes = recipe({
  base: baseStyle,
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
        opacity: 0.5,
        filter: 'grayscale(100%)',
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
        ':hover': {
          backgroundColor: themeVars.color.primary['700'],
        },
        ':active': {
          backgroundColor: themeVars.color.primary['800'],
        },
      },
    },
    {
      variants: {
        level: 'primary',
        variant: 'outline',
      },
      style: {
        ':hover': {
          backgroundColor: themeVars.color.primary['50'],
        },
        ':active': {
          backgroundColor: themeVars.color.primary['100'],
        },
      },
    },
    {
      variants: {
        level: 'primary',
        variant: 'ghost',
      },
      style: {
        borderColor: themeVars.color.primary['50'],
        backgroundColor: themeVars.color.primary['50'],
        ':hover': {
          borderColor: themeVars.color.primary['100'],
          backgroundColor: themeVars.color.primary['100'],
        },
        ':active': {
          borderColor: themeVars.color.primary['200'],
          backgroundColor: themeVars.color.primary['200'],
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
        ':hover': {
          backgroundColor: themeVars.color.success['700'],
        },
        ':active': {
          backgroundColor: themeVars.color.success['800'],
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
        ':hover': {
          backgroundColor: themeVars.color.success['50'],
        },
        ':active': {
          backgroundColor: themeVars.color.success['100'],
        },
      },
    },
    {
      variants: {
        level: 'success',
        variant: 'ghost',
      },
      style: {
        borderColor: themeVars.color.success['50'],
        backgroundColor: themeVars.color.success['50'],
        ':hover': {
          borderColor: themeVars.color.success['100'],
          backgroundColor: themeVars.color.success['100'],
        },
        ':active': {
          borderColor: themeVars.color.success['200'],
          backgroundColor: themeVars.color.success['200'],
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
        ':hover': {
          backgroundColor: themeVars.color.natural['700'],
        },
        ':active': {
          backgroundColor: themeVars.color.natural['800'],
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
        ':hover': {
          backgroundColor: themeVars.color.natural['50'],
        },
        ':active': {
          backgroundColor: themeVars.color.natural['100'],
        },
      },
    },
    {
      variants: {
        level: 'natural',
        variant: 'ghost',
      },
      style: {
        borderColor: themeVars.color.natural['50'],
        backgroundColor: themeVars.color.natural['50'],
        ':hover': {
          borderColor: themeVars.color.natural['100'],
          backgroundColor: themeVars.color.natural['100'],
        },
        ':active': {
          borderColor: themeVars.color.natural['200'],
          backgroundColor: themeVars.color.natural['200'],
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
        ':hover': {
          backgroundColor: themeVars.color.warning['700'],
        },
        ':active': {
          backgroundColor: themeVars.color.warning['800'],
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
        ':hover': {
          backgroundColor: themeVars.color.warning['50'],
        },
        ':active': {
          backgroundColor: themeVars.color.warning['100'],
        },
      },
    },
    {
      variants: {
        level: 'warning',
        variant: 'ghost',
      },
      style: {
        borderColor: themeVars.color.warning['50'],
        backgroundColor: themeVars.color.warning['50'],
        ':hover': {
          borderColor: themeVars.color.warning['100'],
          backgroundColor: themeVars.color.warning['100'],
        },
        ':active': {
          borderColor: themeVars.color.warning['200'],
          backgroundColor: themeVars.color.warning['200'],
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
        ':hover': {
          backgroundColor: themeVars.color.danger['700'],
        },
        ':active': {
          backgroundColor: themeVars.color.danger['800'],
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
        ':hover': {
          backgroundColor: themeVars.color.danger['50'],
        },
        ':active': {
          backgroundColor: themeVars.color.danger['100'],
        },
      },
    },
    {
      variants: {
        level: 'danger',
        variant: 'ghost',
      },
      style: {
        borderColor: themeVars.color.danger['50'],
        backgroundColor: themeVars.color.danger['50'],
        ':hover': {
          borderColor: themeVars.color.danger['100'],
          backgroundColor: themeVars.color.danger['100'],
        },
        ':active': {
          borderColor: themeVars.color.danger['200'],
          backgroundColor: themeVars.color.danger['200'],
        },
      },
    },
  ],
});

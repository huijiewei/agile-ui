import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/vars.css';

export const scrollAreaClass = style({
  position: 'relative',
  overflow: 'hidden',
});

export const scrollAreaScrollbarRecipe = recipe({
  base: {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    position: 'absolute',
    padding: themeVars.scrollArea.scrollbar.padding,
    transition: 'background-color 150ms ease, opacity 150ms ease',
    ':hover': {
      backgroundColor: 'rgb(0, 0, 0, 0.09)',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        bottom: 0,
      },
      vertical: {
        top: 0,
        bottom: themeVars.scrollArea.corner.height,
      },
    },
    direction: {
      rtl: {},
      ltr: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        orientation: 'horizontal',
        direction: 'rtl',
      },
      style: {
        left: themeVars.scrollArea.corner.width,
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        direction: 'ltr',
      },
      style: {
        right: themeVars.scrollArea.corner.width,
      },
    },
    {
      variants: {
        orientation: 'vertical',
        direction: 'rtl',
      },
      style: {
        left: 0,
      },
    },
    {
      variants: {
        orientation: 'vertical',
        direction: 'ltr',
      },
      style: {
        right: 0,
      },
    },
  ],
});

export const scrollAreaViewportRecipe = recipe({
  base: {
    width: '100%',
    height: '100%',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    selectors: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  variants: {
    offsetScrollbars: {
      true: {},
      false: {},
    },
    direction: {
      rtl: {},
      ltr: {},
    },
    scrollbarXEnabled: {
      true: {
        overflowX: 'scroll',
      },
      false: {
        overflowX: 'hidden',
      },
    },
    scrollbarYEnabled: {
      true: {
        overflowY: 'scroll',
      },
      false: {
        overflowY: 'hidden',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        offsetScrollbars: true,
        direction: 'rtl',
      },
      style: {
        paddingLeft: calc(themeVars.scrollArea.scrollbar.padding)
          .multiply(2)
          .add(themeVars.scrollArea.scrollbar.width)
          .toString(),
      },
    },
    {
      variants: {
        offsetScrollbars: true,
        direction: 'ltr',
      },
      style: {
        paddingRight: calc(themeVars.scrollArea.scrollbar.padding)
          .multiply(2)
          .add(themeVars.scrollArea.scrollbar.width)
          .toString(),
      },
    },
  ],
});

export const scrollAreaContentClass = style({
  minWidth: '100%',
  display: 'table',
});

export const scrollAreaThumbClass = style({
  flex: '1 1 0%',
  backgroundColor: 'rgb(0, 0, 0, 0.3)',
  position: 'relative',
  width: themeVars.scrollArea.scrollbar.width,
  height: themeVars.scrollArea.scrollbar.height,
  borderRadius: themeVars.radius.md,
  transition: 'background-color 150ms ease, opacity 150ms ease',
  ':hover': {
    backgroundColor: 'rgb(0, 0, 0, 0.39)',
  },
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: 39,
      minHeight: 39,
    },
  },
});

export const scrollAreaCornerRecipe = recipe({
  base: {
    position: 'absolute',
    bottom: 0,
    width: themeVars.scrollArea.corner.width,
    height: themeVars.scrollArea.corner.height,
  },
  variants: {
    direction: {
      rtl: {
        left: 0,
      },
      ltr: {
        right: 0,
      },
    },
  },
});

export const visibleHiddenClass = style({
  visibility: 'hidden',
});

export const visibleVisibleClass = style({
  visibility: 'visible',
});

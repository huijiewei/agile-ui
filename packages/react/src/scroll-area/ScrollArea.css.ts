import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/vars.css';

export const scrollAreaVars = createThemeContract({
  scrollbar: {
    padding: null,
    width: null,
    height: null,
  },
  corner: {
    height: null,
    width: null,
  },
});

export const scrollAreaClass = style({
  vars: assignVars(scrollAreaVars, {
    scrollbar: {
      padding: '2px',
      width: '6px',
      height: '6px',
    },
    corner: {
      width: '0',
      height: '0',
    },
  }),
  position: 'relative',
  overflow: 'hidden',
});

export const scrollAreaScrollbarRecipe = recipe({
  base: {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    position: 'absolute',
    padding: scrollAreaVars.scrollbar.padding,
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
        bottom: scrollAreaVars.corner.height,
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
        left: scrollAreaVars.corner.width,
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        direction: 'ltr',
      },
      style: {
        right: scrollAreaVars.corner.width,
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
        paddingLeft: calc(scrollAreaVars.scrollbar.padding).multiply(2).add(scrollAreaVars.scrollbar.width).toString(),
      },
    },
    {
      variants: {
        offsetScrollbars: true,
        direction: 'ltr',
      },
      style: {
        paddingRight: calc(scrollAreaVars.scrollbar.padding).multiply(2).add(scrollAreaVars.scrollbar.width).toString(),
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
  width: scrollAreaVars.scrollbar.width,
  height: scrollAreaVars.scrollbar.height,
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
    width: scrollAreaVars.corner.width,
    height: scrollAreaVars.corner.height,
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

import { createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const layoutVars = createThemeContract({
  aside: {
    width: null,
    background: null,
  },
});

export const layoutRecipe = recipe({
  base: {
    height: '100vh',
    display: 'flex',
    flex: '1',
  },
  variants: {
    hasAside: {
      true: {
        flexDirection: 'row',
      },
      false: {
        flexDirection: 'column',
      },
    },
  },
});

export const layoutAsideClass = style({
  position: 'relative',
  flex: 'none',
  width: layoutVars.aside.width,
  background: layoutVars.aside.background,
});

export const layoutContentClass = style({
  flex: '1',
});

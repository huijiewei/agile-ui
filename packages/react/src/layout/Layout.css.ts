import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
});

export const layoutContentClass = style({
  flex: '1',
});

export const layoutHeaderClass = style({
  flex: '0 0 auto',
});

export const layoutFooterClass = style({
  flex: '0 0 auto',
});

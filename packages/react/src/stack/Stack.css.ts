import { recipe } from '@vanilla-extract/recipes';

export const stackRecipe = recipe({
  base: {
    display: 'flex',
    margin: 0,
  },
  variants: {
    /**
     * The direction to stack the items.
     */
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

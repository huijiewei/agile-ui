import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const base = style({
  display: 'flex',
  margin: 0,
});

export const variants = recipe({
  base,
  variants: {
    /**
     * The direction to stack the items.
     */
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
});

export type StackVariants = RecipeVariants<typeof variants>;

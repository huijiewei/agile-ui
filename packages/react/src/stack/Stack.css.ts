import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '../theme/styles/vars.css';
import { style } from '@vanilla-extract/css';

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

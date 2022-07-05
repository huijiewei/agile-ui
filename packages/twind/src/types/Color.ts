import type colors from '../presets/colors';
import type { Tuple } from './Tuple';

export type TwindDefaultColor = keyof typeof colors;

export type TwindColorsOverride = {
  /* empty type */
};

export type TwindColors = TwindColorsOverride extends {
  colors: Record<infer CustomColors, Tuple<string, 10>>;
}
  ? Record<CustomColors, Tuple<string, 10>>
  : Record<TwindDefaultColor, Tuple<string, 10>>;

export type TwindColor = keyof TwindColors;

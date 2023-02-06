import type colors from '../tokens/colors';

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;

type TwindDefaultColor = keyof typeof colors;

type TwindColorsOverride = {
  /* empty type */
};

export type TwindColors = TwindColorsOverride extends {
  colors: Record<infer CustomColors, Tuple<string, 10>>;
}
  ? Record<CustomColors, Tuple<string, 10>>
  : Record<TwindDefaultColor, Tuple<string, 10>>;

export type TwindColor = keyof TwindColors;

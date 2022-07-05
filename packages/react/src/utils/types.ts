import type { TwindColor } from '@agile-ui/twind';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type NumberSize = number | Size;

export type BaseColor = 'white' | 'black';

export type ScaleColor = Exclude<TwindColor, 'current' | 'transparent' | 'inherit' | 'white' | 'black'>;

export type Color = BaseColor | ScaleColor;

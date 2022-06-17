import type { Colors } from '@agile-ui/twind';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BaseColor = 'white' | 'black';

export type ScaleColor = keyof Omit<Colors, 'current' | 'transparent' | 'inherit' | 'white' | 'black'>;

export type Color = BaseColor | ScaleColor;

import type { colors } from './twind';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColorSole = 'current' | 'transparent' | 'white' | 'black' | 'inherit';

export type Color = keyof Omit<typeof colors, ColorSole>;

export type ColorLevel = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type ColorWithLevel = `${Color}-${ColorLevel}` & ColorSole;

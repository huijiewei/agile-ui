export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ColorType = 'blue' | 'green' | 'red' | 'yellow' | 'gray';
type ColorLevel = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type Color = `${ColorType}-${ColorLevel}`;

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { Tuple } from '@agile-ui/twind';

type CustomColors = 'purple';

declare module '@agile-ui/twind' {
  export type TwindColorsOverride = {
    colors: Record<CustomColors, Tuple<string, 10>>;
  };
}

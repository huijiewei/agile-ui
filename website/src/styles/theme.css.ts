import { defaultTheme, themeVars } from '@agile-ui/react';
import { createGlobalTheme } from '@vanilla-extract/css';

createGlobalTheme(':root', themeVars, defaultTheme);

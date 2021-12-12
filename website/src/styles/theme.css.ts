import '@agile-ui/react/styles/reset.css';
import '@agile-ui/react/styles/theme.css';

import { globalStyle } from '@vanilla-extract/css';

globalStyle('#root, #__next', {
  isolation: 'isolate',
});

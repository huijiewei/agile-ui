import { globalStyle } from '@vanilla-extract/css';

globalStyle('#root, #__next', {
  isolation: 'isolate',
});

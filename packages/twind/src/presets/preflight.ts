import type { Preflight } from '@twind/core';

import theme from './theme';

const preflight: Preflight = {
  '*,::before,::after': {
    boxSizing: 'border-box' /* 1 */,
    borderWidth: '0' /* 2 */,
    borderStyle: 'solid' /* 2 */,
    borderColor: 'theme(borderColor.DEFAULT, currentColor)' /* 2 */,
  },

  '::before,::after': { '--tw-content': "''" },

  html: {
    lineHeight: 1.5 /* 1 */,
    WebkitTextSizeAdjust: '100%' /* 2 */,
    MozTabSize: '4' /* 3 */,
    tabSize: 4 /* 3 */,
    fontFamily: `theme(fontFamily.sans, ${(theme.fontFamily as Record<string, string>).sans})` /* 4 */,
    fontFeatureSettings: 'theme(fontFamily.sans[1].fontFeatureSettings, normal)' /* 5 */,
    colorScheme: 'light',
  },

  body: {
    margin: '0' /* 1 */,
    lineHeight: 'inherit' /* 2 */,
  },

  hr: { height: '0' /* 1 */, color: 'inherit', /* 2 */ borderTopWidth: '1px' /* 3 */ },

  'abbr:where([title])': { textDecoration: 'underline dotted' },

  'h1,h2,h3,h4,h5,h6': { fontSize: 'inherit', fontWeight: 'inherit' },

  a: { color: 'inherit', textDecoration: 'inherit' },

  'b,strong': { fontWeight: 'bolder' },

  'code,kbd,samp,pre': {
    fontFamily: `theme(fontFamily.mono, ${(theme.fontFamily as Record<string, string>).mono})`,
    fontFeatureSettings: 'theme(fontFamily.mono[1].fontFeatureSettings, normal)',
    fontSize: '1em',
  },

  table: {
    textIndent: '0' /* 1 */,
    borderColor: 'inherit' /* 2 */,
    borderCollapse: 'collapse' /* 3 */,
  },

  'button,input,optgroup,select,textarea': {
    fontFamily: 'inherit' /* 1 */,
    fontSize: '100%' /* 1 */,
    lineHeight: 'inherit' /* 1 */,
    color: 'inherit' /* 1 */,
    margin: '0' /* 2 */,
    padding: '0' /* 3 */,
  },

  'button,select': { textTransform: 'none' },

  "button,[type='button'],[type='reset'],[type='submit']": {
    WebkitAppearance: 'button' /* 1 */,
    backgroundColor: 'transparent' /* 2 */,
    backgroundImage: 'none' /* 4 */,
  },

  ':-moz-focusring': { outline: 'auto' },

  ':-moz-ui-invalid': { boxShadow: 'none' },

  progress: { verticalAlign: 'baseline' },

  '::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
    height: 'auto',
  },

  "[type='search']": { WebkitAppearance: 'textfield' /* 1 */, outlineOffset: '-2px' /* 2 */ },

  '::-webkit-search-decoration': { WebkitAppearance: 'none' },

  '::-webkit-file-upload-button': {
    WebkitAppearance: 'button' /* 1 */,
    font: 'inherit' /* 2 */,
  },

  summary: { display: 'list-item' },

  'blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre': {
    margin: '0',
  },
  fieldset: { margin: '0', padding: '0' },
  legend: { padding: '0' },
  'ol,ul,menu': { listStyle: 'none', margin: '0', padding: '0' },

  textarea: { resize: 'vertical' },

  'input::placeholder,textarea::placeholder': {
    opacity: 1 /* 1 */,
    color: 'theme(colors.gray.400, #9ca3af)' /* 2 */,
  },

  'button,[role="button"]': { cursor: 'pointer' },

  ':disabled': { cursor: 'default' },

  'img,svg,video,canvas,audio,iframe,embed,object': {
    display: 'block' /* 1 */,
    verticalAlign: 'middle' /* 2 */,
  },

  'img,video': { maxWidth: '100%', height: 'auto' },

  '[hidden]': { display: 'none' },
};

export default preflight;

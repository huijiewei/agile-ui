export type Mode = 'light' | 'dark';

const gray = {
  50: '#f8f9fa',
  100: '#f1f3f5',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#868e96',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
};

const red = {
  50: '#fff5f5',
  100: '#ffe3e3',
  200: '#ffc9c9',
  300: '#ffa8a8',
  400: '#ff8787',
  500: '#ff6b6b',
  600: '#fa5252',
  700: '#f03e3e',
  800: '#e03131',
  900: '#c92a2a',
};

const pink = {
  50: '#fff0f6',
  100: '#ffdeeb',
  200: '#fcc2d7',
  300: '#faa2c1',
  400: '#f783ac',
  500: '#f06595',
  600: '#e64980',
  700: '#d6336c',
  800: '#c2255c',
  900: '#a61e4d',
};

const grape = {
  50: '#f8f0fc',
  100: '#f3d9fa',
  200: '#eebefa',
  300: '#e599f7',
  400: '#da77f2',
  500: '#cc5de8',
  600: '#be4bdb',
  700: '#ae3ec9',
  800: '#9c36b5',
  900: '#862e9c',
};

const violet = {
  50: '#f3f0ff',
  100: '#e5dbff',
  200: '#d0bfff',
  300: '#b197fc',
  400: '#9775fa',
  500: '#845ef7',
  600: '#7950f2',
  700: '#7048e8',
  800: '#6741d9',
  900: '#5f3dc4',
};

const indigo = {
  50: '#edf2ff',
  100: '#dbe4ff',
  200: '#bac8ff',
  300: '#91a7ff',
  400: '#748ffc',
  500: '#5c7cfa',
  600: '#4c6ef5',
  700: '#4263eb',
  800: '#3b5bdb',
  900: '#364fc7',
};

const blue = {
  50: '#e7f5ff',
  100: '#d0ebff',
  200: '#a5d8ff',
  300: '#74c0fc',
  400: '#4dabf7',
  500: '#339af0',
  600: '#228be6',
  700: '#1c7ed6',
  800: '#1971c2',
  900: '#1864ab',
};

const cyan = {
  50: '#e3fafc',
  100: '#c5f6fa',
  200: '#99e9f2',
  300: '#66d9e8',
  400: '#3bc9db',
  500: '#22b8cf',
  600: '#15aabf',
  700: '#1098ad',
  800: '#0c8599',
  900: '#0b7285',
};

const teal = {
  50: '#e6fcf5',
  100: '#c3fae8',
  200: '#96f2d7',
  300: '#63e6be',
  400: '#38d9a9',
  500: '#20c997',
  600: '#12b886',
  700: '#0ca678',
  800: '#099268',
  900: '#087f5b',
};

const green = {
  50: '#ebfbee',
  100: '#d3f9d8',
  200: '#b2f2bb',
  300: '#8ce99a',
  400: '#69db7c',
  500: '#51cf66',
  600: '#40c057',
  700: '#37b24d',
  800: '#2f9e44',
  900: '#2b8a3e',
};

const lime = {
  50: '#f4fce3',
  100: '#e9fac8',
  200: '#d8f5a2',
  300: '#c0eb75',
  400: '#a9e34b',
  500: '#94d82d',
  600: '#82c91e',
  700: '#74b816',
  800: '#66a80f',
  900: '#5c940d',
};

const yellow = {
  50: '#fff9db',
  100: '#fff3bf',
  200: '#ffec99',
  300: '#ffe066',
  400: '#ffd43b',
  500: '#fcc419',
  600: '#fab005',
  700: '#f59f00',
  800: '#f08c00',
  900: '#e67700',
};

const orange = {
  50: '#fff4e6',
  100: '#ffe8cc',
  200: '#ffd8a8',
  300: '#ffc078',
  400: '#ffa94d',
  500: '#ff922b',
  600: '#fd7e14',
  700: '#f76707',
  800: '#e8590c',
  900: '#d9480f',
};

export const colors = {
  current: 'currentColor',
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  gray,
  red,
  pink,
  grape,
  violet,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  orange,
  primary: blue,
  success: green,
  natural: gray,
  warning: orange,
  danger: red,
};

export type ColorLevel = 'primary' | 'success' | 'natural' | 'warning' | 'danger';

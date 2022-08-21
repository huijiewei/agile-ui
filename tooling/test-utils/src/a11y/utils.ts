import chalk from 'chalk';
import { format as prettyFormat, plugins as prettyFormatPlugins } from 'pretty-format';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHTMLString = (html: any): html is string => {
  return typeof html === 'string' && /(<([^>]+)>)/i.test(html);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHTMLElement = (html: any): html is HTMLElement => {
  return !!html && typeof html == 'object' && typeof html.tagName == 'string';
};

export const mount = (html: Element | string): [HTMLElement, () => void] => {
  if (isHTMLElement(html)) {
    if (document.body.contains(html)) {
      return [html, () => undefined];
    }

    html = html.outerHTML;
  }

  if (isHTMLString(html)) {
    const originalHTML = document.body.innerHTML;

    const restore = () => {
      document.body.innerHTML = originalHTML;
    };

    document.body.innerHTML = html;

    return [document.body, restore];
  }

  throw new Error(`html parameter should be an HTML string or an HTML element`);
};

type MatcherHintColor = (arg: string) => string;

export type MatcherHintOptions = {
  comment?: string;
  expectedColor?: MatcherHintColor;
  isDirectExpectCall?: boolean;
  isNot?: boolean;
  promise?: string;
  receivedColor?: MatcherHintColor;
  secondArgument?: string;
  secondArgumentColor?: MatcherHintColor;
};

const DIM_COLOR = chalk.dim;
const EXPECTED_COLOR = chalk.green;
const RECEIVED_COLOR = chalk.red;
const SPACE_SYMBOL = '\u{00B7}';

export const matcherHint = (
  matcherName: string,
  received = 'received',
  expected = 'expected',
  options: MatcherHintOptions = {}
): string => {
  const {
    comment = '',
    expectedColor = EXPECTED_COLOR,
    isDirectExpectCall = false, // seems redundant with received === ''
    isNot = false,
    promise = '',
    receivedColor = RECEIVED_COLOR,
    secondArgument = '',
    secondArgumentColor = EXPECTED_COLOR,
  } = options;
  let hint = '';
  let dimString = 'expect'; // concatenate adjacent dim substrings

  if (!isDirectExpectCall && received !== '') {
    hint += DIM_COLOR(`${dimString}(`) + receivedColor(received);
    dimString = ')';
  }

  if (promise !== '') {
    hint += DIM_COLOR(`${dimString}.`) + promise;
    dimString = '';
  }

  if (isNot) {
    hint += `${DIM_COLOR(`${dimString}.`)}not`;
    dimString = '';
  }

  if (matcherName.includes('.')) {
    dimString += matcherName;
  } else {
    hint += DIM_COLOR(`${dimString}.`) + matcherName;
    dimString = '';
  }

  if (expected === '') {
    dimString += '()';
  } else {
    hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected);
    if (secondArgument) {
      hint += DIM_COLOR(', ') + secondArgumentColor(secondArgument);
    }
    dimString = ')';
  }

  if (comment !== '') {
    dimString += ` // ${comment}`;
  }

  if (dimString !== '') {
    hint += DIM_COLOR(dimString);
  }

  return hint;
};

const { AsymmetricMatcher, DOMCollection, DOMElement, Immutable, ReactElement, ReactTestComponent } =
  prettyFormatPlugins;

const PLUGINS = [ReactTestComponent, ReactElement, DOMElement, DOMCollection, Immutable, AsymmetricMatcher];

const stringify = (object: unknown, maxDepth = 10, maxWidth = 10): string => {
  const MAX_LENGTH = 10000;

  let result;

  try {
    result = prettyFormat(object, {
      maxDepth,
      maxWidth,
      min: true,
      plugins: PLUGINS,
    });
  } catch {
    result = prettyFormat(object, {
      callToJSON: false,
      maxDepth,
      maxWidth,
      min: true,
      plugins: PLUGINS,
    });
  }

  if (result.length >= MAX_LENGTH && maxDepth > 1) {
    return stringify(object, Math.floor(maxDepth / 2), maxWidth);
  }
  if (result.length >= MAX_LENGTH && maxWidth > 1) {
    return stringify(object, maxDepth, Math.floor(maxWidth / 2));
  }
  return result;
};

const replaceTrailingSpaces = (text: string): string => {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
};

export const printReceived = (object: unknown): string => {
  return RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));
};

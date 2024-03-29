import React, { createElement, isValidElement, ReactElement } from 'react';

import { transform, normalizeCode } from './transform';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Scope = Record<string, any> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import?: Record<string, any>;
};

export type RunnerOptions = {
  code: string;
  scope?: Scope;
};

const evalCode = (code: string, scope: Scope) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { default: _, import: imports, ...rest } = scope;
  const finalScope: Scope = { React, require: createRequire(imports), ...rest };
  const scopeKeys = Object.keys(finalScope);
  const scopeValues = scopeKeys.map((key) => finalScope[key]);

  // eslint-disable-next-line no-new-func
  const fn = new Function(...scopeKeys, code);
  return fn(...scopeValues);
};

export const generateElement = (options: RunnerOptions): ReactElement | null => {
  const { code, scope } = options;

  if (!code.trim()) {
    return null;
  }

  const exports: Scope = {};
  const render = (value: unknown) => {
    exports.default = value;
  };

  evalCode(transform(normalizeCode(code)), { render, ...scope, exports });

  const result = exports.default;
  if (!result) {
    return null;
  }

  if (isValidElement(result)) {
    return result;
  }

  if (typeof result === 'function') {
    return createElement(result);
  }

  if (typeof result === 'string') {
    return result as unknown as ReactElement;
  }

  return null;
};

export const createRequire =
  (imports: Scope = {}) =>
  (module: string): Scope => {
    // eslint-disable-next-line no-prototype-builtins
    if (!imports.hasOwnProperty(module)) {
      throw new Error(`Module not found: '${module}'`);
    }
    return imports[module];
  };

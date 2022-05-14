import { allComponents } from 'contentlayer/generated';
import React from 'react';
import ReactDOM from 'react-dom';
import { components } from '../../data/components';

import { _jsx_runtime } from './jsx-runtime.cjs';

const getMDXComponent = (code: string, globals: Record<string, unknown> = {}): React.ComponentType<any> => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
};

const useMDXComponent = (code: string, globals: Record<string, unknown> = {}): React.ComponentType<any> => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
};

export const useMDX = (slug: string) => {
  const componentDoc = allComponents.find((post) => post.slug === `${slug}`);

  const MDXComponent = useMDXComponent(componentDoc?.body.code || '', {
    types: componentDoc?.types,
  });
  return <MDXComponent components={components} />;
};

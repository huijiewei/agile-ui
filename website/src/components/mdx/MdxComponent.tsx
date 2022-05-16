import * as AgileUI from '@agile-ui/react';
import React, { ComponentProps, isValidElement } from 'react';
import ReactDOM from 'react-dom';

import { _jsx_runtime } from './jsx-runtime.cjs';
import { MdxCodeBlock } from './MdxCodeBlock';
import { MdxPropsTable } from './MdxPropsTable';
import { MdxShowcase } from './MdxShowcase';

export const components = {
  h1: (props: ComponentProps<'h1'>) => <AgileUI.Box className={'text-xl font-bold'} as="h1" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <AgileUI.Box className={'text-lg font-bold'} as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <AgileUI.Box className={'text-lg font-bold'} as="h3" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <AgileUI.Box className={'text-lg font-bold'} as="h4" {...props} />,
  h5: (props: ComponentProps<'h5'>) => <AgileUI.Box className={'text-base font-bold'} as="h5" {...props} />,
  h6: (props: ComponentProps<'h6'>) => <AgileUI.Box className={'text-base font-bold'} as="h6" {...props} />,
  AgileUI,
  code: MdxCodeBlock,
  pre: (props: ComponentProps<'pre'>) => {
    const { children, ...rest } = props;
    const childrenProps = isValidElement(children) && children.props;
    return <MdxCodeBlock {...{ ...rest, ...childrenProps }} />;
  },
  Showcase: MdxShowcase,
  PropsTable: MdxPropsTable,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMdxComponent = (code: string, globals: Record<string, unknown> = {}): React.ComponentType<any> => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
};

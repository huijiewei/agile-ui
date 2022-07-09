import * as AgileReact from '@agile-ui/react';
import * as AgileReactIcons from '@agile-ui/react-icons';
import type { MDXComponents } from 'mdx/types';
import { isValidElement, ReactNode } from 'react';
import { MdxCodeLive } from '../components/mdx/MdxCodeLive';
import { MdxPropsTable, MdxPropsTableProps } from '../components/mdx/MdxPropsTable';
import { MdxShowcase } from '../components/mdx/MdxShowcase';

type Props = Record<string, unknown> & { children?: ReactNode };

export const components = {
  h1: (props: Props) => {
    const { children, ...rest } = props;
    return (
      <h1 className={`text-lg font-bold`} {...rest}>
        {children}
      </h1>
    );
  },
  h2: (props: Props) => {
    const { children, ...rest } = props;
    return (
      <h2 className={`group text-lg font-bold scroll-mt-20`} {...rest}>
        {children}
        <a
          className={'group-hover:opacity-100 opacity-0 text-green-500 ml-2 transition-opacity'}
          aria-hidden={true}
          href={`#${props.id}`}
        >
          #
        </a>
      </h2>
    );
  },
  h3: (props: Props) => {
    const { children, ...rest } = props;
    return (
      <h3 className={`group text-lg font-bold scroll-mt-20`} {...rest}>
        {children}
        <a
          className={'group-hover:opacity-100 opacity-0 text-green-500 ml-2 transition-opacity'}
          aria-hidden={true}
          href={`#${props.id}`}
        >
          #
        </a>
      </h3>
    );
  },
  h4: (props: Props) => {
    const { children, ...rest } = props;
    return (
      <h4 className={`group text-lg font-bold scroll-mt-20`} {...rest}>
        {children}
        <a
          className={'group-hover:opacity-100 opacity-0 text-green-500 ml-2 transition-opacity'}
          aria-hidden={true}
          href={`#${props.id}`}
        >
          #
        </a>
      </h4>
    );
  },
  h5: (props: Props) => {
    const { children, ...rest } = props;
    return (
      <h5 className={`text-lg font-bold`} {...rest}>
        {children}
      </h5>
    );
  },
  code: (props: Props) => {
    return <code className={'m-0 px-[0.4em] py-[0.2em] bg-gray-100 rounded text-sm'} {...props} />;
  },
  pre: (props: Props) => {
    const { children, ...rest } = props;
    const childrenProps = isValidElement(children) && children.props;
    return <MdxCodeLive {...{ ...rest, ...childrenProps }} />;
  },
  Showcase: MdxShowcase,
  PropsTable: MdxPropsTable,
  ...AgileReact,
  ...AgileReactIcons,
} as unknown as MDXComponents;

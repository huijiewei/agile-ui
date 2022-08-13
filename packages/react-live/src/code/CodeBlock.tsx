import { ComponentPropsWithoutRef, CSSProperties, Fragment } from 'react';
import Highlight, { Prism as defaultPrism } from 'prism-react-renderer';

import type { Language, PrismTheme } from 'prism-react-renderer';

export type CodeBlockProps = Omit<ComponentPropsWithoutRef<'pre'>, 'children'> & {
  children?: string;
  language?: Language;
  theme: PrismTheme;
  noWrapper?: boolean;
  noWrap?: boolean;
  padding?: number;
};

export const CodeBlock = ({
  children,
  language = 'jsx',
  theme,
  padding = 10,
  noWrapper,
  noWrap,
  className: _className,
  style: _style,
  ...rest
}: CodeBlockProps) => {
  return (
    <Highlight code={children || ''} language={language} Prism={defaultPrism} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const children = tokens.map((line, i) => (
          <Fragment key={i}>
            <span {...getLineProps({ line })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </span>
            {'\n'}
          </Fragment>
        ));

        if (noWrapper) return children;

        const wrapperStyle: CSSProperties = {
          margin: 0,
          padding: padding,
          whiteSpace: noWrap ? 'pre' : 'pre-wrap',
        };

        return (
          <pre
            className={_className ? `${className} ${_className}` : className}
            style={{ ...style, ...wrapperStyle, ..._style }}
            {...rest}
          >
            {children}
          </pre>
        );
      }}
    </Highlight>
  );
};

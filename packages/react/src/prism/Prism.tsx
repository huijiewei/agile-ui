import { __DEV__ } from '@agile-ui/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { tx } from 'twind';
import { CopyIcon } from './CopyIcon';

type PrismProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  trim?: boolean;
  showCopyIcon?: boolean;
  withLineNumbers?: boolean;
  children: string;
  language: Language;
};

export const Prism = forwardRef<HTMLDivElement, PrismProps>((props, ref) => {
  const { trim = true, showCopyIcon = true, language, children, className, ...rest } = props;

  const code = trim ? children.trim() : children;

  return (
    <div className={tx('relative', className)} ref={ref} {...rest}>
      {showCopyIcon && <CopyIcon content={code} />}
      <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
});

if (__DEV__) {
  Prism.displayName = 'Prism';
}

import type { EditorProps } from 'react-live';
import { cx } from 'twind';
import Highlight, { Prism } from 'prism-react-renderer';

export const CodeBlock = (props: EditorProps) => {
  return (
    <div
      className={cx(
        'overflow-x-auto rounded border border-gray-200 font-mono text-[92%] leading-snug',
        props.className
      )}
      style={props.style}
    >
      <Highlight
        Prism={(props.prism as typeof Prism) || Prism}
        code={props.code || ''}
        theme={props.theme}
        language={props.language || 'tsx'}
      >
        {({ className: _className, tokens, getLineProps, getTokenProps, style: _style }) => (
          <pre
            className={_className}
            style={{
              margin: 0,
              outline: 'none',
              padding: 10,
              fontFamily: 'inherit',
              ...(!props.className || !props.theme ? {} : _style),
            }}
            spellCheck="false"
          >
            {tokens.map((line, lineIndex) => (
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: `line-${lineIndex}` })}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    // eslint-disable-next-line react/jsx-key
                    <span {...getTokenProps({ token, key: `token-${tokenIndex}` })} />
                  ))}
                {'\n'}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

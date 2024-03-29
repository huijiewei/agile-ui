import { cx } from '@twind/core';
import { CodeBlock, CodeBlockProps } from '@agile-ui/react-live';

export const CodeView = (props: CodeBlockProps) => {
  return (
    <div
      className={cx(
        'overflow-x-auto rounded border border-gray-200 font-mono text-[92%] leading-snug',
        props.className
      )}
      style={props.style}
    >
      <CodeBlock translate={'no'} theme={props.theme} language={props.language}>
        {props.children}
      </CodeBlock>
    </div>
  );
};

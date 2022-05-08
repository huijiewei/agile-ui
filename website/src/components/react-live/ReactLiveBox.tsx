import { Box, Button, Stack } from '@agile-ui/react';
import { __DEV__ } from '@agile-ui/utils';
import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live';
import { Link } from 'react-router-dom';
import { CopyButton } from './CopyButton';

type ReactLiveBoxProps = Omit<LiveProviderProps, 'ref'> & {
  children: string;
};

const ReactLiveBoxScope = { Button, Box, Stack, Link };

export const ReactLiveBox = (props: ReactLiveBoxProps) => {
  const { children, transformCode, scope, ...rest } = props;

  const editorCode = children.replace(/\n$/, '');

  return (
    <LiveProvider
      code={editorCode}
      transformCode={transformCode || ((code) => `${code};`)}
      scope={{ ...scope, ...ReactLiveBoxScope }}
      {...rest}
    >
      <LivePreview className={'mb-3 rounded border border-gray-300 p-3'} />
      <div className={'relative'}>
        <LiveEditor className={'rounded bg-black font-mono'} />
        <CopyButton content={editorCode} />
      </div>
      <LiveError />
    </LiveProvider>
  );
};

if (__DEV__) {
  ReactLiveBox.displayName = 'ReactLiveBox';
}

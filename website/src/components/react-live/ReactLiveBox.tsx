import { Box, Button, Stack } from '@agile-ui/react';
import { __DEV__ } from '@agile-ui/utils';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Link } from 'react-router-dom';
import { CopyButton } from './CopyButton';

const scope = { Button, Box, Stack, Link };

export const ReactLiveBox = ({ code }: { code: string }) => {
  const editorCode = code.trim();

  return (
    <LiveProvider code={editorCode} scope={scope}>
      <LivePreview className={'border border-gray-300 p-3 rounded mb-3'} />
      <div className={'relative'}>
        <LiveEditor className={'bg-black rounded font-mono'} />
        <CopyButton content={editorCode} />
      </div>
      <LiveError />
    </LiveProvider>
  );
};

if (__DEV__) {
  ReactLiveBox.displayName = 'ReactLiveBox';
}

import { useColorModeState } from '@agile-ui/react';
import { CodeBlock } from '../code/CodeBlock';
import { CopyIcon } from '../code/CopyIcon';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';

export const PlaygroundCode = ({ code }: { code: string }) => {
  const { darkMode } = useColorModeState();

  return (
    <div className={'relative'}>
      <CodeBlock disabled code={code} theme={darkMode ? darkTheme : lightTheme} language={'tsx'} />
      <CopyIcon content={code} />
    </div>
  );
};

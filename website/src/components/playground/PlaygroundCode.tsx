import { useColorModeState } from '@agile-ui/react';
import { CodeView } from '../code/CodeView';
import { CopyIcon } from '../code/CopyIcon';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';

export const PlaygroundCode = ({ code }: { code: string }) => {
  const { darkMode } = useColorModeState();

  return (
    <div className={'relative'}>
      <CodeView className={'rounded-t-none'} theme={darkMode ? darkTheme : lightTheme} language={'tsx'}>
        {code}
      </CodeView>
      <CopyIcon content={code} />
    </div>
  );
};

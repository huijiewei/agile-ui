import { useColorModeState } from '@agile-ui/react';
import { CodeBlock } from '../code/CodeBlock';
import { CopyIcon } from '../code/CopyIcon';
import vsLight from 'prism-react-renderer/themes/vsLight';
import vsDark from 'prism-react-renderer/themes/vsDark';

export const PlaygroundCode = ({ code }: { code: string }) => {
  const { darkMode } = useColorModeState();

  return (
    <div className={'relative'}>
      <CodeBlock disabled code={code} theme={darkMode ? vsDark : vsLight} language={'tsx'} />
      <CopyIcon content={code} />
    </div>
  );
};

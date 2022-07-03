import { useDarkModeState } from '@agile-ui/react';
import { CodeBlock } from '../code/CodeBlock';
import { CopyIcon } from '../code/CopyIcon';
import vsLight from 'prism-react-renderer/themes/vsLight';
import vsDark from 'prism-react-renderer/themes/vsDark';

export const PlaygroundCode = ({ code }: { code: string }) => {
  const darkMode = useDarkModeState();

  return (
    <div className={'relative'}>
      <CodeBlock
        disabled
        code={code}
        theme={darkMode ? vsDark : vsLight}
        className={'rounded rounded-t-none border border-slate-200 overflow-x-auto font-mono text-[13px] leading-5'}
        language={'tsx'}
      />
      <CopyIcon content={code} />
    </div>
  );
};

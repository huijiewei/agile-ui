import { useDarkModeState } from '@agile-ui/react';
import { LiveEditor } from 'react-live';
import { CopyIcon } from '../copy-icon/CopyIcon';
import vsLight from 'prism-react-renderer/themes/vsLight';
import vsDark from 'prism-react-renderer/themes/vsDark';

export const PlaygroundCode = ({ code }: { code: string }) => {
  const darkMode = useDarkModeState();

  return (
    <div className={'relative border border-slate-200 rounded rounded-t-none'}>
      <LiveEditor
        disabled
        code={code}
        theme={darkMode ? vsDark : vsLight}
        className={'rounded rounded-t-none overflow-x-auto font-mono text-[13px] leading-5'}
        language={'tsx'}
      />
      <CopyIcon content={code} />
    </div>
  );
};

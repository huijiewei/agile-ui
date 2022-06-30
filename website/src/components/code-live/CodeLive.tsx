import { useDarkModeState } from '@agile-ui/react';
import * as AgileReact from '@agile-ui/react';
import * as AgileReactIcons from '@agile-ui/react-icons';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/vsLight';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { cx } from 'twind';
import { CopyIcon } from '../copy-icon/CopyIcon';
import { FormDemo } from '../form-demo/FormDemo';

type CodeLiveProps = {
  children?: string;
  preview?: boolean;
  editable?: boolean;
};

export const CodeLive = (props: ComponentProps<'div'> & CodeLiveProps) => {
  const { children, preview = false, editable = false, ...rest } = props;

  const darkMode = useDarkModeState();

  const code = children?.replace(/\n$/, '') || '';

  return (
    <div className={'flex flex-col'} {...rest}>
      <LiveProvider
        theme={darkMode ? vsDark : vsLight}
        code={code}
        scope={{ ...AgileReact, ...AgileReactIcons, FormDemo }}
      >
        {preview && (
          <LivePreview
            className={cx(
              'overflow-x-auto rounded-t border border-slate-300 p-3',
              '&::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px])'
            )}
          />
        )}
        <div className={'relative'}>
          <LiveEditor
            className={cx(
              'overflow-x-auto border p-3 border-slate-300 font-mono text-[93%] leading-snug',
              preview ? 'rounded-b border-t-0' : 'rounded'
            )}
            disabled={!editable}
          />
          <CopyIcon content={code} />
        </div>
        {preview && <LiveError className={'mt-1 rounded bg-red-300 px-2 py-1 font-mono text-[90%]'} />}
      </LiveProvider>
    </div>
  );
};

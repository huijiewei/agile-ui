import { useDarkModeState } from '@agile-ui/react';
import * as AgileReact from '@agile-ui/react';
import * as AgileReactIcons from '@agile-ui/react-icons';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { cx } from 'twind';
import { CodeBlock } from '../code-block/CodeBlock';
import { CopyIcon } from '../copy-icon/CopyIcon';
import { FormDemo } from '../form-demo/FormDemo';
import type { Language } from 'prism-react-renderer';

type CodeLiveProps = {
  children?: string;
  preview?: boolean;
  editable?: boolean;
};

export const CodeLive = (props: ComponentProps<'div'> & CodeLiveProps) => {
  const { children, preview = false, editable = false, className, ...rest } = props;

  const darkMode = useDarkModeState();

  const code = children?.replace(/\n$/, '') || '';
  const lang = (className?.replace('language-', '') || 'tsx') as Language;

  if (!preview) {
    return (
      <div className={`relative`} {...rest}>
        <CodeBlock
          theme={darkMode ? darkTheme : lightTheme}
          code={code}
          language={lang}
          className={'overflow-x-auto border border-gray-300 font-mono text-[93%] leading-snug'}
        ></CodeBlock>
        <CopyIcon content={code} />
      </div>
    );
  }

  return (
    <div className={'flex flex-col'} {...rest}>
      <LiveProvider
        theme={darkMode ? darkTheme : lightTheme}
        code={code}
        language={lang}
        scope={{ ...AgileReact, ...AgileReactIcons, FormDemo }}
      >
        <LivePreview
          className={cx(
            'overflow-x-auto rounded-t border border-gray-300 p-3',
            '&::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300 rounded-[5px])'
          )}
        />
        <div className={'relative'}>
          <LiveEditor
            className={'overflow-x-auto border border-gray-300 font-mono text-[93%] leading-snug rounded-b border-t-0'}
            disabled={!editable}
          />
          <CopyIcon content={code} />
        </div>
        <LiveError className={'mt-1 rounded bg-red-300 px-2 py-1 font-mono text-[90%]'} />
      </LiveProvider>
    </div>
  );
};

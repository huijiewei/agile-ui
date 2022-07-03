import * as AgileReact from '@agile-ui/react';
import { useDarkModeState } from '@agile-ui/react';
import * as AgileReactIcons from '@agile-ui/react-icons';
import type { Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { cx } from 'twind';
import { FormDemo } from '../demo/FormDemo';
import { CodeBlock } from './CodeBlock';
import { CopyIcon } from './CopyIcon';

type CodeLiveProps = {
  code: string;
  language?: Language;
  preview?: boolean;
  editable?: boolean;
};

export const CodeLive = (props: ComponentProps<'div'> & CodeLiveProps) => {
  const { code, preview = false, editable = false, language = 'tsx', className, ...rest } = props;

  const darkMode = useDarkModeState();

  if (!preview) {
    return (
      <div className={`relative`} {...rest}>
        <CodeBlock theme={darkMode ? darkTheme : lightTheme} code={code} language={language}></CodeBlock>
        <CopyIcon content={code} />
      </div>
    );
  }

  return (
    <div className={cx('flex flex-col', className)} {...rest}>
      <LiveProvider
        theme={darkMode ? darkTheme : lightTheme}
        code={code}
        language={language}
        scope={{ ...AgileReact, ...AgileReactIcons, FormDemo }}
      >
        <LivePreview
          className={cx(
            'overflow-x-auto rounded-t border border-gray-200 p-3',
            '&::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])'
          )}
        />
        <div className={'relative'}>
          <LiveEditor
            className={'overflow-x-auto border border-gray-200 font-mono text-[92%] leading-snug rounded-b border-t-0'}
            disabled={!editable}
          />
          <CopyIcon content={code} />
        </div>
        <LiveError className={'mt-1 rounded bg-red-300 px-2 py-1 font-mono text-[90%]'} />
      </LiveProvider>
    </div>
  );
};

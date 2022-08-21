import * as AgileReact from '@agile-ui/react';
import * as AgileReactHooks from '@agile-ui/react-hooks';
import * as AgileReactIcons from '@agile-ui/react-icons';
import type { Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from '@agile-ui/react-live';
import { cx } from 'twind';
import { FormDemo } from '../demo/FormDemo';
import { CodeView } from './CodeView';
import { CopyIcon } from './CopyIcon';
import { InternetExplorer } from '../icons/InternetExplorer';
import { GoogleChrome } from '../icons/GoogleChrome';
import { Firefox } from '../icons/Firefox';
import { Safari } from '../icons/Safari';
import { MicrosoftEdge } from '../icons/MicrosoftEdge';
import { Opera } from '../icons/Opera';
import { Brave } from '../icons/Brave';
import { Vivaldi } from '../icons/Vivaldi';

type CodeLiveProps = {
  code: string;
  language?: Language;
  preview?: boolean;
  editable?: boolean;
};

export const CodeLive = (props: ComponentProps<'div'> & CodeLiveProps) => {
  const { code, preview = false, editable = false, language = 'tsx', className, ...rest } = props;

  const { darkMode } = AgileReact.useColorModeState();

  if (!preview) {
    return (
      <div className={`relative`} {...rest}>
        <CodeView theme={darkMode ? darkTheme : lightTheme} language={language}>
          {code}
        </CodeView>
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
        scope={{
          ...AgileReact,
          ...AgileReactHooks,
          ...AgileReactIcons,
          FormDemo,
          GoogleChrome,
          Firefox,
          Safari,
          MicrosoftEdge,
          Opera,
          Brave,
          Vivaldi,
          InternetExplorer,
        }}
      >
        <LivePreview className={'overflow-x-auto rounded-t border border-gray-200 p-3 scrollbar'} />
        <div className={'relative'}>
          <LiveEditor
            translate={'no'}
            readOnly={!editable}
            className={'overflow-x-auto border border-gray-200 font-mono text-[92%] leading-snug rounded-b border-t-0'}
            ignoreTabKey={false}
            insertSpaces
            padding={10}
            tabSize={2}
          />
          <CopyIcon content={code} />
        </div>
        <LiveError className={'mt-1 rounded bg-red-200 px-2 py-1 font-mono text-[90%]'} />
      </LiveProvider>
    </div>
  );
};

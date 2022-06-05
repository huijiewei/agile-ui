import { useDarkModeState } from '@agile-ui/react';
import * as AgileUI from '@agile-ui/react';
import * as AgileIcons from '@agile-ui/react-icons';
import { CopyIcon } from '../copy-icon/CopyIcon';
import { __DEV__ } from '@agile-ui/utils';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Link } from 'react-router-dom';
import { tx } from 'twind';
import vsLight from 'prism-react-renderer/themes/vsLight';
import vsDark from 'prism-react-renderer/themes/vsDark';

export type MdxCodeBlockProps = Omit<ComponentProps<'code'>, 'ref'> & {
  children?: string;
  live?: boolean;
  editable?: boolean;
};

export const MdxCodeBlock = (props: MdxCodeBlockProps) => {
  const darkMode = useDarkModeState();

  const { children, live, editable, ...rest } = props;

  const code = children?.replace(/\n$/, '') || '';

  return (
    <LiveProvider theme={darkMode ? vsDark : vsLight} code={code} scope={{ ...AgileUI, ...AgileIcons, Link }} {...rest}>
      <div className={'flex flex-col'}>
        {live && <LivePreview className={'overflow-x-auto rounded-t border border-slate-300 p-3'} />}
        <div className={'relative'}>
          <LiveEditor
            disabled={!editable}
            className={tx(
              'overflow-x-auto border border-t-0 border-slate-300 font-mono text-[13px] leading-5',
              live ? 'rounded-b' : 'rounded'
            )}
          />
          <CopyIcon content={code} />
        </div>
        {live && <LiveError className={'mt-1 rounded bg-red-300 px-2 py-1 font-mono text-[13px]'} />}
      </div>
    </LiveProvider>
  );
};

if (__DEV__) {
  MdxCodeBlock.displayName = 'ReactLiveBox';
}

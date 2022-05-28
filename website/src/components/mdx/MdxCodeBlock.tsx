import * as AgileUI from '@agile-ui/react';
import { CopyIcon } from '@agile-ui/react';
import { __DEV__ } from '@agile-ui/utils';
import type { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Link } from 'react-router-dom';
import { tx } from 'twind';

export type MdxCodeBlockProps = Omit<ComponentProps<'code'>, 'ref'> & {
  children?: string;
  live?: boolean;
  editable?: boolean;
};

export const MdxCodeBlock = (props: MdxCodeBlockProps) => {
  const { children, live, editable, ...rest } = props;

  const code = children?.replace(/\n$/, '') || '';

  return (
    <LiveProvider code={code} scope={{ ...AgileUI, Link }} {...rest}>
      <div>
        {live && <LivePreview className={'overflow-x-auto rounded-t border border-b-0 border-slate-300 p-3'} />}
        <div className={'relative'}>
          <LiveEditor
            disabled={!editable}
            className={tx(
              'overflow-x-auto bg-slate-700 font-mono text-[13px] leading-5',
              live ? 'rounded-b' : 'rounded'
            )}
          />
          <CopyIcon content={code} />
        </div>
        {live && <LiveError className={'mt-1 rounded bg-red-400 px-2 py-1 font-mono text-[13px] text-white'} />}
      </div>
    </LiveProvider>
  );
};

if (__DEV__) {
  MdxCodeBlock.displayName = 'ReactLiveBox';
}

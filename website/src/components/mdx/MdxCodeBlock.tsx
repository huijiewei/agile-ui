import { Tooltip, twClsx } from '@agile-ui/react';
import * as AgileUI from '@agile-ui/react';
import { useClipboard } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { Check, Clipboard } from '@icon-park/react';
import { ComponentProps } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Link } from 'react-router-dom';

const CopyButton = ({ content }: { content: string }) => {
  const { copied, onCopy } = useClipboard();

  return (
    <div className={'absolute right-1.5 top-1.5 '}>
      <Tooltip
        className={copied ? 'border-green-200 bg-green-200 text-green-900' : ''}
        arrowClassName={copied ? 'border-green-200 bg-green-200' : ''}
        style={'light'}
        placement={'left'}
        content={copied ? '已复制' : '复制代码'}
      >
        <button
          type={'button'}
          className={'appearance-none px-2 py-0.5 font-bold text-white'}
          onClick={() => onCopy(content)}
        >
          {copied ? <Check /> : <Clipboard />}
        </button>
      </Tooltip>
    </div>
  );
};

if (__DEV__) {
  CopyButton.displayName = 'CopyButton';
}

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
      <div className={'text-[13px]'}>
        {live && <LivePreview className={'overflow-x-auto rounded-t border border-b-0 border-slate-300 p-3'} />}
        <div className={'relative'}>
          <LiveEditor disabled={!editable} className={twClsx('bg-black font-mono', live ? 'rounded-b' : 'rounded')} />
          <CopyButton content={code} />
        </div>
        {live && <LiveError className={'mt-1 rounded bg-red-400 px-2 py-1 font-mono text-white'} />}
      </div>
    </LiveProvider>
  );
};

if (__DEV__) {
  MdxCodeBlock.displayName = 'ReactLiveBox';
}

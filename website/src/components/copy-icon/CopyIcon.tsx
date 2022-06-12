import { useClipboard } from '@agile-ui/react-hooks';
import { Clipboard, ClipboardCheck } from '@agile-ui/react-icons';
import { __DEV__ } from '@agile-ui/utils';
import { Tooltip } from '@agile-ui/react';

export const CopyIcon = ({ content }: { content: string }) => {
  const { copied, onCopy } = useClipboard();

  return (
    <div className={'absolute right-1.5 top-1.5'}>
      <Tooltip color={copied ? 'green' : undefined} content={copied ? '已复制' : '复制代码'}>
        <button type={'button'} className={'appearance-none p-1 font-medium relative'} onClick={() => onCopy(content)}>
          {copied ? <ClipboardCheck className={'text-green-700'} /> : <Clipboard className={'text-slate-700'} />}
        </button>
      </Tooltip>
    </div>
  );
};

if (__DEV__) {
  CopyIcon.displayName = 'CopyButton';
}

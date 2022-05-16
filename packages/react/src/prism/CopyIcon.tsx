import { useClipboard } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';
import { Check, Clipboard } from '@icon-park/react';
import { Tooltip } from '../tooltip/Tooltip';

export const CopyIcon = ({ content }: { content: string }) => {
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
  CopyIcon.displayName = 'CopyButton';
}

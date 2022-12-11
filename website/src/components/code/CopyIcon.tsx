import { Tooltip } from '@agile-ui/react';
import { useClipboard } from '@agile-ui/react-hooks';
import { Clipboard, ClipboardCheck } from '@agile-ui/react-icons';

export const CopyIcon = ({ content }: { content: string }) => {
  const { copied, onCopy } = useClipboard();

  return (
    <div className={'absolute right-1.5 top-1.5'}>
      <Tooltip color={copied ? 'green' : undefined} content={copied ? '已复制' : '复制代码'}>
        <button type={'button'} className={'relative appearance-none p-1 font-medium'} onClick={() => onCopy(content)}>
          {copied ? (
            <ClipboardCheck className={'text-green-500'} />
          ) : (
            <Clipboard className={'text-gray-500 hover:text-gray-600'} />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

CopyIcon.displayName = 'CopyButton';
